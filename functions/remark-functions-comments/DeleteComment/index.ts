import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { ChannelResource, CommentResource, PostResource } from '../lib/model'

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
  const commentsContainer = fetchCosmosContainer(database, 'Comments')
  const commentItem = commentsContainer.item(id, id)
  const { resource: comment } = await commentItem.read<CommentResource>()

  if (!comment) {
    context.res = {
      status: 404,
      body: { message: `Comment with id ${id} not found.` }
    }
    return
  }

  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const { resource: parentPost } = await postsContainer.item(comment.parentPostId, comment.parentPostId).read<PostResource>()

  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const { resource: parentChannel } = await channelsContainer
    .item(parentPost.parentChannelId, parentPost.parentChannelId)
    .read<ChannelResource>()

  if (comment.publisherId != user.id && parentChannel.ownerId != user.id && !parentChannel.moderatorIds.includes(user.id)) {
    context.res = {
      status: 403,
      body: { message: 'You are forbidden to make changes this channel!' }
    }
    return
  }

  // Soft delete comment
  const { resource: deletedComment } = await commentItem.replace<CommentResource & { isDeleted: boolean; deletedByUserId: string }>({
    ...comment,
    isDeleted: true,
    deletedByUserId: user.id
  })

  context.res = {
    body: deletedComment
  }
}

export default httpTrigger
