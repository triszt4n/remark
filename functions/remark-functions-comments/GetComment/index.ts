import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { CommentView, MyVoteType } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryCommentVotesByCommentAndUser, createQueryCommentVotesByCommentId } from '../lib/dbQueries'
import { CommentResource, CommentVoteResource, UserResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

  // User data from Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  const user = result.isError ? null : (result.userFromJwt as { id: string; username: string; email: string })

  const database = fetchCosmosDatabase()
  const commentsContainer = fetchCosmosContainer(database, 'Comments')

  const { resource: comment } = await commentsContainer.item(id, id).read<CommentResource>()
  if (!comment) {
    context.res = {
      status: 404,
      body: { message: `Comment with id ${id} not found.` }
    }
    return
  }

  // todo: optimize with parallel
  const usersContainer = fetchCosmosContainer(database, 'Users')
  const { resource: publisher } = await usersContainer.item(comment.publisherId, comment.publisherId).read<UserResource>()

  const commentVotesContainer = fetchCosmosContainer(database, 'CommentVotes')
  const { resources: commentVotes } = await commentVotesContainer.items
    .query<CommentVoteResource>(createQueryCommentVotesByCommentId(comment.id))
    .fetchAll()
  const voteCount = commentVotes.reduce((total, { isUpvote }) => (isUpvote ? total + 1 : total - 1), 0)

  let myVote: MyVoteType = 'none'
  if (user) {
    const { resources } = await commentVotesContainer.items
      .query<CommentVoteResource>(createQueryCommentVotesByCommentAndUser(comment.id, user.id))
      .fetchAll()
    if (resources.length > 0) {
      myVote = resources[0].isUpvote ? 'up' : 'down'
    }
  }

  const returnable: CommentView = {
    ...comment,
    publisher,
    voteCount,
    amIPublisher: user?.id == comment.publisherId,
    myVote
  }

  context.res = {
    body: returnable
  }
}

export default httpTrigger
