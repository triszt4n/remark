import { AzureFunction, Context } from '@azure/functions'
import { NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { PostResource, PostVoteResource, UserResource } from '../lib/model'

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: PostVoteResource[]): Promise<void> {
  const database = fetchCosmosDatabase()
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const usersContainer = fetchCosmosContainer(database, 'Users')

  await Promise.all(
    documents.map(async (vote) => {
      const { resource: post } = await postsContainer.item(vote.postId, vote.postId).read<PostResource>()
      const { resource: voterUser } = await usersContainer.item(vote.userId, vote.userId).read<UserResource>()
      await notificationsContainer.items.create<NotificationModel>({
        createdAt: +new Date(),
        messageBody: `Your post "${post.title}" under posts/${post.id} received an ${vote.isUpvote ? 'upvote' : 'downvote'} by u/${
          voterUser.username
        }.`,
        messageTitle: 'Someone voted on your post',
        userId: post.publisherId,
        isSent: false
      })
    })
  )
}

export default cosmosDBTrigger
