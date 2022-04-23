import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'

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
  const channelItem = channelsContainer.item(id, id)
  const { resource: channel } = await channelItem.read<ChannelModel>()
  if (channel.ownerId != user.id) {
    context.res = {
      status: 403,
      body: { message: 'You are forbidden to delete this channel!' }
    }
    return
  }
  const { resource: deletedChannel } = await channelItem.delete<ChannelModel>()

  context.res = {
    body: deletedChannel
  }
}

export default httpTrigger
