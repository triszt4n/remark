import { AzureFunction, Context } from '@azure/functions'
import { NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { DeletedCommentResource, PostResource, UserResource } from '../lib/model'

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: DeletedCommentResource[]): Promise<void> {
  if (!documents && documents.length === 0) {
    context.log('Nothing to process at [CreateCommentCosmosTrigger]')
    return
  }

  if (documents.every((comment) => !!comment.isDeleted)) return // if all deleted, do nothing

  const database = fetchCosmosDatabase()
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const usersContainer = fetchCosmosContainer(database, 'Users')

  await Promise.all(
    documents
      .filter((comment) => !comment.isDeleted) // filter for non-deleted
      .map(async (comment) => {
        const { resource: parentPost } = await postsContainer.item(comment.parentPostId, comment.parentPostId).read<PostResource>()
        const { resource: commenterUser } = await usersContainer.item(comment.publisherId, comment.publisherId).read<UserResource>()
        await notificationsContainer.items.create<NotificationModel>({
          createdAt: +new Date(),
          messageBody:
            `Your post titled [${parentPost.title}](/posts/${parentPost.id}) received a comment by ` +
            `[u/${commenterUser.username}](/u/${commenterUser.username}).`,
          messageTitle: 'Someone commented on your post',
          userId: parentPost.publisherId,
          isSent: false
        })
      })
  )
}

export default cosmosDBTrigger
