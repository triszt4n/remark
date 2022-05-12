import { AzureFunction, Context } from '@azure/functions'
import { NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryChannelJoinsOfChannel, createQueryPostsOfChannel } from '../lib/dbQueries'
import { ChannelJoinResource, ChannelResource, PostResource } from '../lib/model'

type DeletedChannelResource = ChannelResource & { isDeleted?: boolean }

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: DeletedChannelResource[]): Promise<void> {
  if (!documents && documents.length === 0) {
    context.log('Nothing to process at [DeleteChannelCosmosTrigger]')
    return
  }

  const database = fetchCosmosDatabase()
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const channelsContainer = fetchCosmosContainer(database, 'Channels')

  await Promise.all(
    documents
      .filter((channel) => channel.isDeleted)
      .map(async (channel) => {
        // Soft delete posts of channel
        const { resources: posts } = await postsContainer.items.query<PostResource>(createQueryPostsOfChannel(channel.id)).fetchAll()
        await Promise.all(posts.map(async (post) => postsContainer.item(post.id, post.id).replace({ ...post, isDeleted: true })))

        // Properly delete channel joins
        const { resources: channelJoins } = await channelJoinsContainer.items
          .query<ChannelJoinResource>(createQueryChannelJoinsOfChannel(channel.id))
          .fetchAll()

        await Promise.all(
          channelJoins.map(async (join) => {
            // Notif about delete to joined people
            await notificationsContainer.items.create<NotificationModel>({
              createdAt: +new Date(),
              messageBody:
                `The channel ch/${channel.uriName} that you were a joined member of` +
                `was deleted by the owner. It is not available anymore.`,
              messageTitle: 'One of your joined channels was removed',
              userId: join.userId,
              isSent: false
            })
            // Delete join
            await channelJoinsContainer.item(join.id, join.id).delete<ChannelJoinResource>()
          })
        )

        // Delete channel
        return channelsContainer.item(channel.id, channel.id).delete()
      })
  )
}

export default cosmosDBTrigger
