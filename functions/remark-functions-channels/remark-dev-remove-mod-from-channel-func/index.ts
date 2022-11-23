import { Database } from '@azure/cosmos'
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryChannelJoinOfUserIdAndChannelId } from '../lib/dbQueries'
import { ChannelJoinResource, ChannelResource } from '../lib/model'

const createNotifications = async (database: Database, forUserId: string, ownerUsername: string, channel: ChannelResource) => {
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  await notificationsContainer.items.create<NotificationModel>({
    createdAt: +new Date(),
    messageBody:
      `You've been demoted from moderator privileges in [ch/${channel.uriName}](/ch/${channel.uriName}) ` +
      `by the owner [u/${ownerUsername}](/u/${ownerUsername}).`,
    messageTitle: 'Your moderator privilege has been revoked',
    userId: forUserId
  })
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string
  const moderatorId = context.bindingData.moderatorId as string

  // Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  if (result.isError) {
    context.res = {
      status: result.status,
      body: { message: result.message }
    }
    return
  }
  const { userFromJwt: user } = result

  const database = fetchCosmosDatabase()
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const channelItem = channelsContainer.item(id, id)
  let { resource: channel } = await channelItem.read<ChannelResource>()
  if (!channel) {
    context.res = {
      status: 404,
      body: { message: `Channel with id ${id} not found.` }
    }
    return
  }

  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const { resources: channelJoins } = await channelJoinsContainer.items
    .query<ChannelJoinResource>(createQueryChannelJoinOfUserIdAndChannelId(moderatorId, id))
    .fetchAll()
  const { resources: ownerJoins } = await channelJoinsContainer.items
    .query<ChannelJoinResource>(createQueryChannelJoinOfUserIdAndChannelId(user.id, id))
    .fetchAll()

  if (channelJoins.length === 0) {
    context.res = {
      status: 404,
      body: { message: `Channel join with user id ${moderatorId} and channel id ${id} not found.` }
    }
    return
  }

  // Does channel have this moderator
  if (!channelJoins[0].isModerator) {
    context.res = {
      status: 400,
      body: { message: 'Moderator id is not an id of a moderator!' }
    }
    return
  }

  // Check permissions
  if (ownerJoins.length === 0 || !ownerJoins[0].isOwner) {
    context.res = {
      status: 403,
      body: { message: 'You are forbidden to make changes this channel!' }
    }
    return
  }

  // Apply changes
  const { resource: removedChannelJoin } = await channelJoinsContainer.item(channelJoins[0].id, channelJoins[0].id).delete()

  context.res = {
    body: removedChannelJoin
  }

  // Send out notification for moderator
  await createNotifications(database, moderatorId, user.username, channel)
}

export default httpTrigger
