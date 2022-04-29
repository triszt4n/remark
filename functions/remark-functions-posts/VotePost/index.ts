import { Container } from '@azure/cosmos'
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { MyVoteType, PostVoteModel } from '@triszt4n/remark-types'
import validator from 'validator'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryPostVoteByPostIdAndUserId } from '../lib/dbQueries'
import { PostVoteResource } from '../lib/model'

const tryDeletingVote = async (container: Container, commentId: string, foundVote: PostVoteResource | undefined): Promise<any> => {
  if (foundVote) {
    const { resource: deletedVote } = await container.item(foundVote.id, foundVote.id).delete<PostVoteResource>()
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
  postId: string,
  user: { id: string },
  isUpvote: boolean,
  foundVote?: PostVoteResource
): Promise<any> => {
  if (foundVote) {
    const { resource: updatedVote } = await container.item(foundVote.id).replace<PostVoteResource>({ ...foundVote, isUpvote })
    return {
      body: updatedVote
    }
  }

  const { resource: createdVote } = await container.items.create<PostVoteModel>({
    userId: user.id,
    postId: postId,
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
  const postVotesContainer = fetchCosmosContainer(database, 'PostVotes')
  const { resources: postVotes } = await postVotesContainer.items
    .query<PostVoteResource>(createQueryPostVoteByPostIdAndUserId(id, user.id))
    .fetchAll()

  // Found the one
  let postVote: PostVoteResource | undefined = undefined
  if (postVotes.length > 0) {
    postVote = postVotes[0]
  }

  switch (intent) {
    case 'none':
      context.res = await tryDeletingVote(postVotesContainer, id, postVote)
      break
    case 'up':
      context.res = await tryUpOrDownvoting(postVotesContainer, id, user, true, postVote)
      break
    case 'down':
      context.res = await tryUpOrDownvoting(postVotesContainer, id, user, false, postVote)
      break
  }
}

export default httpTrigger
