import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { ChannelResource, PostResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

  // Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  if (result.isError) {
    context.res = {
      status: result.status,
      body: { message: result.message }
    }
    return
  }
  const { userFromJwt: user } = result

  const database = fetchCosmosDatabase()
  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const postItem = postsContainer.item(id, id)
  const { resource: post } = await postItem.read<PostResource>()

  if (!post) {
    context.res = {
      status: 404,
      body: { message: `Post with id ${id} not found.` }
    }
    return
  }

  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const { resource: parentChannel } = await channelsContainer.item(post.parentChannelId, post.parentChannelId).read<ChannelResource>()

  // Deleting is available for: publisher, channel owner and channel moderators
  if (post.publisherId != user.id && parentChannel.ownerId != user.id && !parentChannel.moderatorIds.includes(user.id)) {
    context.res = {
      status: 403,
      body: { message: 'You are forbidden to delete this post!' }
    }
    return
  }

  // Soft delete post
  const { resource: deletedPost } = await postItem.replace<PostResource & { isDeleted: boolean; deletedByUserId: string }>({
    ...post,
    isDeleted: true,
    deletedByUserId: user.id
  })

  context.res = {
    body: deletedPost
  }
}

export default httpTrigger
