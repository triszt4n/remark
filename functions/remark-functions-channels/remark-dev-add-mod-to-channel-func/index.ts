import { Database } from '@azure/cosmos'
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryChannelJoinOfUserIdAndChannelId, createQueryUserByUsername } from '../lib/dbQueries'
import { ChannelJoinResource, ChannelResource, UserResource } from '../lib/model'

const createNotifications = async (database: Database, forUserId: string, ownerUsername: string, channel: ChannelResource) => {
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  await notificationsContainer.items.create<NotificationModel>({
    createdAt: +new Date(),
    messageBody:
      `You've been made a moderator of [ch/${channel.uriName}](/ch/${channel.uriName}) ` +
      `by the owner [u/${ownerUsername}](/u/${ownerUsername}).`,
    messageTitle: "You've been promoted to moderator",
    userId: forUserId
  })
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

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

  const { moderatorUsername } = req.body as { moderatorUsername: string }
  if (!moderatorUsername) {
    context.res = {
      status: 400,
      body: { message: `Request body field(s) failed validation.` }
    }
    return
  }

  const database = fetchCosmosDatabase()
  const usersContainer = fetchCosmosContainer(database, 'Users')
  const { resources: users } = await usersContainer.items.query<UserResource>(createQueryUserByUsername(moderatorUsername)).fetchAll()
  if (users.length === 0) {
    context.res = {
      status: 404,
      body: { message: `User under username ${moderatorUsername} not found!` }
    }
    return
  }
  const moderator = users[0]

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

  // Check permissions
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const { resources: ownerJoins } = await channelJoinsContainer.items
    .query<ChannelJoinResource>(createQueryChannelJoinOfUserIdAndChannelId(user.id, id))
    .fetchAll()
  if (ownerJoins.length == 0 || !ownerJoins[0].isOwner) {
    context.res = {
      status: 403,
      body: { message: 'You are forbidden to make changes this channel!' }
    }
    return
  }

  // Check if joined yet
  const { resources: channelJoins } = await channelJoinsContainer.items
    .query<ChannelJoinResource>(createQueryChannelJoinOfUserIdAndChannelId(moderator.id, id))
    .fetchAll()
  if (channelJoins.length === 0) {
    context.res = {
      status: 404,
      body: { message: `The user ${moderatorUsername} has not joined to the channel yet!` }
    }
    return
  }

  // Apply changes
  const channelJoin = { ...channelJoins[0], isModerator: true }
  const { resource: updatedChannelJoin } = await channelJoinsContainer.item(channelJoins[0].id, channelJoins[0].id).replace(channelJoin)

  context.res = {
    body: updatedChannelJoin
  }

  // Send out notification for moderator
  await createNotifications(database, moderator.id, user.username, channel)
}

export default httpTrigger
