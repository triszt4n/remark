import { Database } from '@azure/cosmos'
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { ChannelResource } from '../lib/model'

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

  // Does channel have this moderator
  if (!channel.moderatorIds.includes(moderatorId)) {
    context.res = {
      status: 400,
      body: { message: 'Moderator id is not an id of a moderator!' }
    }
    return
  }

  // Check permissions
  if (channel.ownerId != user.id) {
    context.res = {
      status: 403,
      body: { message: 'You are forbidden to make changes this channel!' }
    }
    return
  }

  // Apply changes
  channel.moderatorIds.splice(channel.moderatorIds.indexOf(moderatorId), 1)
  const { resource: updatedChannel } = await channelItem.replace<ChannelResource>(channel)

  context.res = {
    body: updatedChannel
  }

  // Send out notification for moderator
  await createNotifications(database, moderatorId, user.username, channel)
}

export default httpTrigger
