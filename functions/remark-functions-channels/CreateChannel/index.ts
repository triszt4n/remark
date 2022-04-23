import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelModel, CreateChannelView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'

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

  const { uriName, title, descRawMarkdown } = req.body as CreateChannelView
  // todo: Insert validation of request body here
  const creatableChannel: ChannelModel = {
    uriName,
    createdAt: +new Date(),
    title,
    descRawMarkdown,
    ownerId: user.id,
    moderatorIds: []
  }

  const database = fetchCosmosDatabase()
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const { resource: channel } = await channelsContainer.items.create(creatableChannel)

  context.res = {
    body: channel
  }
}

export default httpTrigger
