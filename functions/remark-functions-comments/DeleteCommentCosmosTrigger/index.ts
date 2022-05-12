import { AzureFunction, Context } from '@azure/functions'
import { NotificationModel } from '@triszt4n/remark-types'
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
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')

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
        await commentsContainer.item(comment.id, comment.id).delete()

        // Notif about delete to publisher user
        await notificationsContainer.items.create<NotificationModel>({
          createdAt: +new Date(),
          messageBody:
            `Your comment starting with "${comment.rawMarkdown.substring(0, 20)}..." [on this post](/posts/${comment.parentPostId}) ` +
            `was deleted (by you or a moderator). It is not available anymore.`,
          messageTitle: 'Your comment has been deleted',
          userId: comment.publisherId
        })
      })
  )
}

export default cosmosDBTrigger
