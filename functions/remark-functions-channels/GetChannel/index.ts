import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelView } from '@triszt4n/remark-types'
import { fetchCosmosContainer } from '../lib/dbConfig'
import { ChannelResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string
  const channelsContainer = fetchCosmosContainer('Channels')

  // User data from Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  if (result.isError) {
    context.res = {
      status: result.status,
      body: { message: result.message }
    }
    return
  }
  const { userFromJwt } = result

  // Query from DB
  const response = await channelsContainer.item(id, id).read<ChannelResource>()
  if (response instanceof Error) {
    context.log('[ERROR] at GetChannel', response as Error)
    context.res = {
      status: 500,
      body: { message: `Error in database: Could not read channel!` }
    }
    return
  }
  const channel = response.resource

  if (channel == null) {
    context.res = {
      status: 404,
      body: { message: `Channel with id ${id} not found` }
    }
    return
  }

  // Query from DB: joinCount
  const response = await channelsContainer.item(id, id).read<ChannelResource>()
  if (response instanceof Error) {
    context.log.error('[ERROR] at GetChannel', response as Error)
    context.res = {
      status: 500,
      body: { message: `Error in database: Could not read channel!` }
    }
    return
  }
  const channel = response.resource

  // Query from DB: joinCount
  const response = await channelsContainer.item(id, id).read<ChannelResource>()
  if (response instanceof Error) {
    context.log('[ERROR] at GetChannel', response as Error)
    context.res = {
      status: 500,
      body: { message: `Error in database: Could not read channel!` }
    }
    return
  }
  const channel = response.resource

  const returnable: ChannelView = {
    ...channel,
    joinCount: 0,
    postsCount: 0,
    ownerUsername: '',
    amIJoined: false,
    amIOwner: false,
    amIModerator: false
  }

  context.res = {
    body: returnable
  }
}

export default httpTrigger
