import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelView } from '@triszt4n/remark-types'
import { fetchCosmosContainer } from '../lib/dbConfig'
import {
  createQueryChannelJoinOfUserIdAndChannelId,
  createQueryForJoinCountOfChannel,
  createQueryForPostCountOfChannel
} from '../lib/dbQueries'
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
  const queryResponse1 = await channelJoinsContainer.items.query<number>(createQueryForJoinCountOfChannel(id)).fetchAll()
  const joinCount = queryResponse1.resources[0]

  // Query from DB: amIJoined
  const queryResponse2 = await channelJoinsContainer.items.query<string>(createQueryChannelJoinOfUserIdAndChannelId(user.id, id)).fetchAll()
  const amIJoined = user ? queryResponse2.resources[0] != null : false

  // Query from DB: postsCount
  const queryResponse3 = await postsContainer.items.query<number>(createQueryForPostCountOfChannel(id)).fetchAll()
  const postsCount = queryResponse3.resources[0]

  const amIOwner = user ? user.id === channel.ownerId : false
  const amIModerator = user ? channel.moderatorIds.some((e) => e === user.id) : false

  const returnable: ChannelView = {
    ...channel,
    joinCount,
    postsCount,
    amIJoined,
    amIOwner,
    amIModerator,
    ownerUsername: '' // todo: remove, update package
  }

  context.res = {
    body: returnable
  }
}

export default httpTrigger
