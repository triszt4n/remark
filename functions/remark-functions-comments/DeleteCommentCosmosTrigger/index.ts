import { AzureFunction, Context } from '@azure/functions'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryCommentVotesByCommentId } from '../lib/dbQueries'
import { CommentVoteResource, DeletedCommentResource } from '../lib/model'

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: DeletedCommentResource[]): Promise<void> {
  if (!documents && documents.length === 0) {
    context.log('Nothing to process at [DeleteCommentCosmosTrigger]')
    return
  }

  const database = fetchCosmosDatabase()
  const commentVotesContainer = fetchCosmosContainer(database, 'CommentVotes')
  const commentsContainer = fetchCosmosContainer(database, 'Comments')

  await Promise.all(
    documents
      .filter((comment) => !!comment.isDeleted)
      .map(async (comment) => {
        // Properly delete comment votes
        const { resources: commentVotes } = await commentVotesContainer.items
          .query<CommentVoteResource>(createQueryCommentVotesByCommentId(comment.id))
          .fetchAll()
        await Promise.all(commentVotes.map(async (commentVote) => commentVotesContainer.item(commentVote.id, commentVote.id).delete()))

        // Delete comment
        return commentsContainer.item(comment.id, comment.id).delete()
      })
  )
}

export default cosmosDBTrigger
