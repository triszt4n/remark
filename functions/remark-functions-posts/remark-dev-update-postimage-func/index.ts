import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { BlockBlobParallelUploadOptions } from '@azure/storage-blob'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import * as multipart from 'parse-multipart'
import { v4 as uuidv4 } from 'uuid'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryChannelJoinByUserIdAndChannelId } from '../lib/dbQueries'
import { ChannelJoinResource, ChannelResource, PostResource } from '../lib/model'
import { fetchBlobContainer } from '../lib/storageConfig'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  // Request body verification
  if (!req.body || !req.body.length) {
    context.res = {
      status: 400,
      body: { message: `Bad request: Request body is invalid!` }
    }
    return
  }
  if (!req.headers || !req.headers['content-type']) {
    context.res = {
      status: 400,
      body: { message: `Bad request: Content type not defined!` }
    }
    return
  }
  if (!req.query?.filename) {
    context.res = {
      status: 400,
      body: { message: `Bad request: Filename not defined in query!` }
    }
    return
  }

  // Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  if (result.isError) {
    context.res = {
      status: result.status,
      body: { message: result.message }
    }
    return
  }
  const { userFromJwt: user } = result as { userFromJwt: { id: string; username: string; email: string } }

  // Get post
  const id = context.bindingData.id as string
  const database = fetchCosmosDatabase()
  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const postItem = postsContainer.item(id, id)
  let { resource: post } = await postItem.read<PostResource>()
  if (!post) {
    context.res = {
      status: 404,
      body: { message: `Post with id ${id} not found.` }
    }
    return
  }

  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const { resource: parentChannel } = await channelsContainer.item(post.parentChannelId, post.parentChannelId).read<ChannelResource>()
  const { resources: channelJoins } = await channelJoinsContainer.items
    .query<ChannelJoinResource>(createQueryChannelJoinByUserIdAndChannelId(user.id, parentChannel.id))
    .fetchAll()

  if (channelJoins.length == 0) {
    context.res = {
      status: 403,
      body: { message: 'You are not joined to the parent channel of this post!' }
    }
    return
  }

  // Deleting is available for: publisher, channel owner and channel moderators
  if (post.publisherId != user.id && !channelJoins[0].isOwner && !channelJoins[0].isModerator) {
    context.res = {
      status: 403,
      body: { message: 'You are forbidden to delete this post!' }
    }
    return
  }

  const oldImageUrl = post.imageUrl
  try {
    // Each chunk of the file is delimited by a special string
    const filename = req.query.filename
    const bodyBuffer = Buffer.from(req.body)
    const boundary = multipart.getBoundary(req.headers['content-type'])
    const parts = multipart.Parse(bodyBuffer, boundary)

    // The file buffer is corrupted or incomplete?
    if (!parts?.length) {
      context.res = {
        status: 400,
        body: { message: `Failed upload: File buffer is incorrect` }
      }
      return
    }

    // Upload as Blob
    const blobContainerName = 'remark-post-images'
    const blobContainer = fetchBlobContainer(blobContainerName)
    const blobName = `${post.id}_${uuidv4()}_${filename}`

    const blobClient = blobContainer.getBlockBlobClient(blobName)
    const options: BlockBlobParallelUploadOptions = {
      tags: { postId: post.id }
    }
    await blobClient.uploadData(parts[0]?.data, options)
    const imageUrl = `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${blobContainerName}/${blobName}`

    const { resource: updatedPost } = await postItem.replace<PostResource & { isUpdated: boolean }>({
      ...post,
      imageUrl,
      isUpdated: true
    })

    context.res = {
      body: updatedPost
    }

    // Delete old blob
    if (oldImageUrl) {
      const oldBlobName = oldImageUrl.split('/').pop()
      const oldBlobClient = blobContainer.getBlockBlobClient(oldBlobName)
      await oldBlobClient.delete()
    }
  } catch (err) {
    context.log.error(err.message)
    context.res = {
      status: 500,
      body: { message: `${err.message}` }
    }
    return
  }
}

export default httpTrigger
