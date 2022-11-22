import { Container } from '@azure/cosmos'
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { CommentVoteModel, MyVoteType } from '@triszt4n/remark-types'
import validator from 'validator'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryCommentVotesByCommentAndUser } from '../lib/dbQueries'
import { CommentVoteResource } from '../lib/model'

const tryDeletingVote = async (container: Container, commentId: string, foundVote: CommentVoteResource | undefined): Promise<any> => {
  if (foundVote) {
    const { resource: deletedVote } = await container.item(foundVote.id, foundVote.id).delete<CommentVoteResource>()
    return {
      body: deletedVote
    }
  }

  return {
    status: 404,
    body: { message: `Could not delete: No comment vote found under comment ${commentId} by you.` }
  }
}

const tryUpOrDownvoting = async (
  container: Container,
  commentId: string,
  user: { id: string },
  isUpvote: boolean,
  foundVote?: CommentVoteResource
): Promise<any> => {
  if (foundVote) {
    const { resource: updatedVote } = await container.item(foundVote.id).replace<CommentVoteResource>({ ...foundVote, isUpvote })
    return {
      body: updatedVote
    }
  }

  const { resource: createdVote } = await container.items.create<CommentVoteModel>({
    userId: user.id,
    commentId: commentId,
    isUpvote
  })
  return {
    body: createdVote
  }
}

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

  const { intent } = req.body as { intent: MyVoteType }
  const isValid = !validator.isEmpty(intent) && validator.isIn(intent, ['up', 'down', 'none'])
  if (!isValid) {
    context.res = {
      status: 400,
      body: { message: `Request body field(s) failed validation.` }
    }
    return
  }

  const database = fetchCosmosDatabase()
  const commentVotesContainer = fetchCosmosContainer(database, 'CommentVotes')
  const { resources: commentVotes } = await commentVotesContainer.items
    .query<CommentVoteResource>(createQueryCommentVotesByCommentAndUser(id, user.id))
    .fetchAll()

  // Found the one
  let commentVote: CommentVoteResource | undefined = undefined
  if (commentVotes.length > 0) {
    commentVote = commentVotes[0]
  }

  switch (intent) {
    case 'none':
      context.res = await tryDeletingVote(commentVotesContainer, id, commentVote)
      break
    case 'up':
      context.res = await tryUpOrDownvoting(commentVotesContainer, id, user, true, commentVote)
      break
    case 'down':
      context.res = await tryUpOrDownvoting(commentVotesContainer, id, user, false, commentVote)
      break
  }
}

export default httpTrigger
