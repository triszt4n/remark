import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelModel, UpdateChannelView } from '@triszt4n/remark-types'
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

  const { uriName, title, descRawMarkdown } = req.body as UpdateChannelView
  // todo: Insert validation of request body here

  const database = fetchCosmosDatabase()
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const channelItem = channelsContainer.item(id, id)
  let { resource: channel } = await channelItem.read<ChannelModel>()

  // Check permissions
  if (channel.ownerId != user.id && channel.moderatorIds.every((id) => user.id != id)) {
    context.res = {
      status: 403,
      body: { message: 'You are forbidden to make changes this channel!' }
    }
    return
  }

  // Apply changes
  channel = {
    ...channel,
    descRawMarkdown,
    uriName,
    title
  }
  const { resource: updatedChannel } = await channelItem.replace<ChannelModel>(channel)

  context.res = {
    body: updatedChannel
  }
}

export default httpTrigger
