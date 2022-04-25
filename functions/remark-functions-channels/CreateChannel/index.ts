import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelJoinModel, ChannelModel, CreateChannelView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryByUriName } from '../lib/dbQueries'
import { ChannelResource, validateInput } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (!req.body) {
    context.res = {
      status: 400,
      body: { message: `No body attached to POST query` }
    }
    return
  }

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

  const inputChannel = req.body as CreateChannelView
  const { uriName, title, descRawMarkdown } = inputChannel
  const isValid = validateInput(inputChannel)
  if (!isValid) {
    context.res = {
      status: 400,
      body: { message: `Request body field(s) failed validation.` }
    }
    return
  }

  // Check for duplicates with uriName
  const database = fetchCosmosDatabase()
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const { resources } = await channelsContainer.items.query<ChannelResource>(createQueryByUriName(uriName)).fetchAll()
  if (resources.length != 0) {
    context.res = {
      status: 400,
      body: { message: `Channel with uriName ${uriName} already exists!` }
    }
    return
  }

  const creatableChannel: ChannelModel = {
    uriName,
    createdAt: +new Date(),
    title,
    descRawMarkdown,
    ownerId: user.id,
    moderatorIds: []
  }

  const { resource: channel } = await channelsContainer.items.create(creatableChannel)

  // Join owner user to channel immediately after creation
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  await channelJoinsContainer.items.create<ChannelJoinModel>({
    createdAt: +new Date(),
    userId: user.id,
    channelId: channel.id
  })

  context.res = {
    body: channel
  }
}

export default httpTrigger
