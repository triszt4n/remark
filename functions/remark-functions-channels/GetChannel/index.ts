import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelView } from '@triszt4n/remark-types'
import { fetchCosmosContainer } from '../lib/dbConfig'
import { ChannelResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string
  const channelsContainer = fetchCosmosContainer('Channels')
  const channelJoinsContainer = fetchCosmosContainer('ChannelJoins')
  const postsContainer = fetchCosmosContainer('Posts')

  // User data from Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  const user = result.isError ? null : (result.userFromJwt as { id: string; username: string; email: string })

  // Query from DB
  const { resource: channel } = await channelsContainer.item(id, id).read<ChannelResource>()
  if (channel == null) {
    context.res = {
      status: 404,
      body: { message: `Channel with id ${id} not found` }
    }
    return
  }

  // Query from DB: joinCount
  const { resource: joinCount } = await channelsContainer.item(id, id).read<ChannelResource>()

  // Query from DB: amIJoined
  const { resource: amIJoined } = await channelsContainer.item(id, id).read<ChannelResource>()

  // Query from DB: postsCount
  const { resource: postsCount } = await channelsContainer.item(id, id).read<ChannelResource>()

  // Query from DB: ownerUsername
  const { resource: ownerUsername } = await channelsContainer.item(id, id).read<ChannelResource>()

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
