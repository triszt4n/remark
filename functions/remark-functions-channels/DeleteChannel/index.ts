import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryChannelJoinOfUserIdAndChannelId } from '../lib/dbQueries'
import { ChannelResource } from '../lib/model'

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

  const database = fetchCosmosDatabase()
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const channelItem = channelsContainer.item(id, id)
  const { resource: channel } = await channelItem.read<ChannelResource>()

  if (!channel) {
    context.res = {
      status: 404,
      body: { message: `Channel with id ${id} not found.` }
    }
    return
  }

  const { resources: channelJoins } = await channelJoinsContainer.items
    .query(createQueryChannelJoinOfUserIdAndChannelId(user.id, id))
    .fetchAll()

  if (channelJoins.length == 0) {
    context.res = {
      status: 404,
      body: { message: `User with id ${user.id} is not joined yet.` }
    }
    return
  }

  if (!channelJoins[0].isOwner) {
    context.res = {
      status: 403,
      body: { message: 'You are forbidden to delete this channel!' }
    }
    return
  }

  // Soft delete channel
  const { resource: deletedChannel } = await channelItem.replace<ChannelResource & { isDeleted: boolean }>({
    ...channel,
    isDeleted: true
  })

  context.res = {
    body: deletedChannel
  }
}

export default httpTrigger
