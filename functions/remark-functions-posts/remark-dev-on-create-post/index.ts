import { AzureFunction, Context } from '@azure/functions'
import { NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryChannelJoinsByChannelId } from '../lib/dbQueries'
import { ChannelJoinResource, ChannelResource, ModifiedPostResource, UserResource } from '../lib/model'

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: ModifiedPostResource[]): Promise<void> {
  if (!documents && documents.length === 0) {
    context.log('Nothing to process at [CreatePostCosmosTrigger]')
    return
  }

  const database = fetchCosmosDatabase()
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const usersContainer = fetchCosmosContainer(database, 'Users')

  await Promise.all(
    documents
      .filter((post) => !post.isDeleted && !post.isUpdated) // filter for non-deleted
      .map(async (post) => {
        const { resource: channel } = await channelsContainer.item(post.parentChannelId, post.parentChannelId).read<ChannelResource>()
        const { resource: publisherUser } = await usersContainer.item(post.publisherId, post.publisherId).read<UserResource>()
        const { resources: joins } = await channelJoinsContainer.items
          .query<ChannelJoinResource>(createQueryChannelJoinsByChannelId(channel.id))
          .fetchAll()
        return await Promise.all(
          joins.map(async (join) => {
            let messageTitle: string
            if (join.isOwner) {
              messageTitle = 'New post in your channel'
            } else if (join.isModerator) {
              messageTitle = 'New post in a channel you moderate'
            } else {
              messageTitle = 'New post in a channel you joined'
            }
            return await notificationsContainer.items.create<NotificationModel>({
              createdAt: +new Date(),
              messageBody:
                `There's a new post titled [${post.title}](/posts/${post.id}), ` +
                `published by [u/${publisherUser.username}](/u/${publisherUser.username}) ` +
                `in [ch/${channel.uriName}](/ch/${channel.uriName}). Check it out!`,
              messageTitle,
              userId: join.userId
            })
          })
        )
      })
  )
}

export default cosmosDBTrigger
