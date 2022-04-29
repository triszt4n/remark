import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import {
  createQueryExistsJoinOfUserIdAndChannelId,
  createQueryForJoinCountOfChannel,
  createQueryForPostCountOfChannel
} from '../lib/dbQueries'
import { ChannelJoinResource, ChannelResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

  // User data from Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  const user = result.isError ? null : (result.userFromJwt as { id: string; username: string; email: string })

  const database = fetchCosmosDatabase()
  // todo: optimize, and place these connection openers where needed
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const postsContainer = fetchCosmosContainer(database, 'Posts')

  const { resource: channel } = await channelsContainer.item(id, id).read<ChannelResource>()
  if (!channel) {
    context.res = {
      status: 404,
      body: { message: `Channel with id ${id} not found.` }
    }
    return
  }

  const [res1, res2, res3] = await Promise.all([
    channelJoinsContainer.items.query<{ joinCount: number }>(createQueryForJoinCountOfChannel(id)).fetchAll(),
    postsContainer.items.query<{ postsCount: number }>(createQueryForPostCountOfChannel(id)).fetchAll(),
    user ? channelJoinsContainer.items.query<ChannelJoinResource>(createQueryExistsJoinOfUserIdAndChannelId(user.id, id)).fetchAll() : null
  ])

  const { joinCount } = res1.resources[0]
  const { postsCount } = res2.resources[0]
  const amIJoined = res3 ? res3.resources.length > 0 : false

  const amIOwner = user ? user.id === channel.ownerId : false
  const amIModerator = user ? channel.moderatorIds.some((e) => e === user.id) : false

  const returnable: ChannelView = {
    ...channel,
    joinCount,
    postsCount,
    amIJoined,
    amIOwner,
    amIModerator
  }

  context.res = {
    body: returnable
  }
}

export default httpTrigger
