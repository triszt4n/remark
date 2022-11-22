import { AzureFunction, Context } from '@azure/functions'
import { NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryOwnerChannelJoinOfChannelId } from '../lib/dbQueries'
import { ChannelJoinResource, ChannelResource, UserResource } from '../lib/model'

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: ChannelJoinResource[]): Promise<void> {
  if (!documents && documents.length === 0) {
    context.log('Nothing to process at [CreateChannelJoinCosmosTrigger]')
    return
  }

  const database = fetchCosmosDatabase()
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const usersContainer = fetchCosmosContainer(database, 'Users')

  await Promise.all(
    documents.map(async (join) => {
      const { resource: channel } = await channelsContainer.item(join.channelId, join.channelId).read<ChannelResource>()
      const { resource: joinedUser } = await usersContainer.item(join.userId, join.userId).read<UserResource>()
      const { resources: ownerJoins } = await channelJoinsContainer.items
        .query<ChannelJoinResource>(createQueryOwnerChannelJoinOfChannelId(channel.id))
        .fetchAll()
      await notificationsContainer.items.create<NotificationModel>({
        createdAt: +new Date(),
        messageBody:
          `Your channel [ch/${channel.uriName}](/ch/${channel.uriName}) ` +
          `celebrates a new join by [u/${joinedUser.username}](/u/${joinedUser.username}).`,
        messageTitle: 'Someone joined your channel',
        userId: ownerJoins[0].userId
      })
    })
  )
}

export default cosmosDBTrigger
