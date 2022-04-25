import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { CommentModel, CommentVoteModel, CreateCommentView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryChannelJoinByUserIdAndChannelId } from '../lib/dbQueries'
import { ChannelJoinResource, PostResource, validateInput } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (!req.body) {
    context.res = {
      status: 400,
      body: { message: `No body attached to POST query` }
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
  const { userFromJwt: user } = result

  const inputComment = req.body as CreateCommentView
  const { parentPostId, rawMarkdown } = inputComment
  const isValid = validateInput(inputComment)
  if (!isValid) {
    context.res = {
      status: 400,
      body: { message: `Request body field(s) failed validation.` }
    }
    return
  }

  // DB
  // todo: optimize container usage
  const database = fetchCosmosDatabase()

  // Check for parent post
  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const { resource: parentPost } = await postsContainer.item(parentPostId, parentPostId).read<PostResource>()
  if (!parentPost) {
    context.res = {
      status: 400,
      body: { message: `Parent post with id ${parentPostId} does not exists!` }
    }
    return
  }

  // Check if joined to channel
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const { resources } = await channelJoinsContainer.items
    .query<ChannelJoinResource>(createQueryChannelJoinByUserIdAndChannelId(user.id, parentPost.parentChannelId))
    .fetchAll()
  if (resources.length == 0) {
    context.res = {
      status: 403,
      body: { message: `You are not joined to the channel you want to publish a comment to!` }
    }
    return
  }

  // Creation
  const creatableComment: CommentModel = {
    createdAt: +new Date(),
    rawMarkdown,
    publisherId: user.id,
    parentPostId: parentPost.id
  }

  const commentsContainer = fetchCosmosContainer(database, 'Comments')
  const { resource: comment } = await commentsContainer.items.create(creatableComment)

  // Upvote the comment by the publisher user immediately after creation
  const commentVotesContainer = fetchCosmosContainer(database, 'CommentVotes')
  await commentVotesContainer.items.create<CommentVoteModel>({
    userId: user.id,
    commentId: comment.id,
    isUpvote: true
  })

  context.res = {
    body: comment
  }
}

export default httpTrigger
