import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { UpdateChannelView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { ChannelResource, validateInput } from '../lib/model'

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

  const inputChannel = req.body as UpdateChannelView
  const { uriName, title, descRawMarkdown } = inputChannel
  const isValid = validateInput(inputChannel)
  if (!isValid) {
    context.res = {
      status: 400,
      body: { message: `Request body field(s) failed validation.` }
    }
    return
  }

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

  // Check permissions
  if (channel.ownerId != user.id && !channel.moderatorIds.includes(user.id)) {
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
  const { resource: updatedChannel } = await channelItem.replace<ChannelResource>(channel)

  context.res = {
    body: updatedChannel
  }
}

export default httpTrigger
