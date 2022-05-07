import { AzureFunction, Context } from '@azure/functions'
import { NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { CommentResource, PostResource, UserResource } from '../lib/model'

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: CommentResource[]): Promise<void> {
  const database = fetchCosmosDatabase()
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const usersContainer = fetchCosmosContainer(database, 'Users')

  await Promise.all(
    documents.map(async (comment) => {
      const { resource: parentPost } = await postsContainer.item(comment.parentPostId, comment.parentPostId).read<PostResource>()
      const { resource: posterUser } = await usersContainer.item(comment.publisherId, comment.publisherId).read<UserResource>()
      await notificationsContainer.items.create<NotificationModel>({
        createdAt: +new Date(),
        messageBody: `Your post posts/${parentPost.id} received a comment by u/${posterUser.username}.`,
        messageTitle: 'Someone commented on your post',
        userId: parentPost.publisherId,
        isSent: false
      })
    })
  )
}

export default cosmosDBTrigger
