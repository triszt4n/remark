import { Container } from '@azure/cosmos'
import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelJoinModel } from '@triszt4n/remark-types'
import validator from 'validator'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryChannelJoinOfUserIdAndChannelId } from '../lib/dbQueries'
import { ChannelJoinResource, ChannelResource } from '../lib/model'

const tryDeletingJoin = async (container: Container, channelId: string, foundJoin: ChannelJoinResource | undefined): Promise<any> => {
  if (foundJoin) {
    const { resource: deletedJoin } = await container.item(foundJoin.id, foundJoin.id).delete<ChannelJoinResource>()

    return {
      body: { join: deletedJoin }
    }
  }

  return {
    status: 404,
    body: { message: `Could not delete: No channel join found under channel ${channelId} by you.` }
  }
}

const tryCreatingJoin = async (
  container: Container,
  channelId: string,
  user: { id: string },
  foundJoin: ChannelJoinResource | undefined
): Promise<any> => {
  if (foundJoin) {
    return {
      status: 304,
      body: { join: foundJoin }
    }
  }

  const { resource: createdJoin } = await container.items.create<ChannelJoinModel>({
    userId: user.id,
    channelId: channelId,
    createdAt: +new Date()
  })
  return {
    body: { join: createdJoin }
  }
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

  const { intent } = req.body as { intent: 'join' | 'leave' }
  const isValid = !validator.isEmpty(intent) && validator.isIn(intent, ['join', 'leave'])
  if (!isValid) {
    context.res = {
      status: 400,
      body: { message: `Request body field(s) failed validation.` }
    }
    return
  }

  // DB
  const database = fetchCosmosDatabase()

  // Owner cannot leave
  const channelContainer = fetchCosmosContainer(database, 'Channels')
  const channelItem = channelContainer.item(id, id)
  const { resource: channel } = await channelItem.read<ChannelResource>()
  if (!channel) {
    context.res = {
      status: 404,
      body: { message: `Channel with id ${id} not found!` }
    }
    return
  }
  if (channel.ownerId === user.id && intent === 'leave') {
    context.res = {
      status: 403,
      body: { message: `Forbidden: Channel owner cannot leave the channel!` }
    }
    return
  }

  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const { resources: channelJoins } = await channelJoinsContainer.items
    .query<ChannelJoinResource>(createQueryChannelJoinOfUserIdAndChannelId(user.id, id))
    .fetchAll()

  // Found the one
  let channelJoin: ChannelJoinResource | undefined = undefined
  if (channelJoins.length > 0) {
    channelJoin = channelJoins[0]
  }

  // This shouldn't work like this, see issue #106
  // Removing moderator if in the channel
  // todo: Optimize with parallel processing
  const indexOfModerator = channel.moderatorIds.indexOf(user.id)
  let updatedChannel: ChannelResource | undefined = undefined
  if (indexOfModerator != -1) {
    channel.moderatorIds.splice(indexOfModerator, 1)
    updatedChannel = (await channelItem.replace<ChannelResource>(channel)).resource
  }

  // Apply changes
  switch (intent) {
    case 'leave':
      context.res = await tryDeletingJoin(channelJoinsContainer, id, channelJoin)
      break
    case 'join':
      context.res = await tryCreatingJoin(channelJoinsContainer, id, user, channelJoin)
      break
  }

  context.res.body.channel = updatedChannel || channel
}

export default httpTrigger
