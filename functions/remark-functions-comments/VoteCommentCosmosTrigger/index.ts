import { AzureFunction, Context } from '@azure/functions'
import { NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { CommentResource, CommentVoteResource, UserResource } from '../lib/model'

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: CommentVoteResource[]): Promise<void> {
  const database = fetchCosmosDatabase()
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  const commentsContainer = fetchCosmosContainer(database, 'Comments')
  const usersContainer = fetchCosmosContainer(database, 'Users')

  await Promise.all(
    documents.map(async (vote) => {
      const { resource: comment } = await commentsContainer.item(vote.commentId, vote.commentId).read<CommentResource>()
      const { resource: voterUser } = await usersContainer.item(vote.userId, vote.userId).read<UserResource>()
      await notificationsContainer.items.create<NotificationModel>({
        createdAt: +new Date(),
        messageBody: `Your comment starting "${comment.rawMarkdown.substring(0, 10)}" under posts/${comment.parentPostId} received an ${
          vote.isUpvote ? 'upvote' : 'downvote'
        } by u/${voterUser.username}.`,
        messageTitle: 'Someone voted on your comment',
        userId: comment.publisherId,
        isSent: false
      })
    })
  )
}

export default cosmosDBTrigger
