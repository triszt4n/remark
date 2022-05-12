import { AzureFunction, Context } from '@azure/functions'
import { NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { CommentResource, CommentVoteResource, PostResource, UserResource } from '../lib/model'

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: CommentVoteResource[]): Promise<void> {
  const database = fetchCosmosDatabase()
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  const commentsContainer = fetchCosmosContainer(database, 'Comments')
  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const usersContainer = fetchCosmosContainer(database, 'Users')

  await Promise.all(
    documents.map(async (vote) => {
      const { resource: comment } = await commentsContainer.item(vote.commentId, vote.commentId).read<CommentResource>()
      const { resource: post } = await postsContainer.item(comment.parentPostId, comment.parentPostId).read<PostResource>()
      const { resource: voterUser } = await usersContainer.item(vote.userId, vote.userId).read<UserResource>()
      await notificationsContainer.items.create<NotificationModel>({
        createdAt: +new Date(),
        messageBody:
          `Your [comment](/posts/${post.id}#${comment.id}) under post titled [${post.title}](/posts/${post.id}) ` +
          `received ${vote.isUpvote ? 'an upvote' : 'a downvote'} by [u/${voterUser.username}](/u/${voterUser.username}).`,
        messageTitle: 'Someone voted on your comment',
        userId: comment.publisherId
      })
    })
  )
}

export default cosmosDBTrigger
