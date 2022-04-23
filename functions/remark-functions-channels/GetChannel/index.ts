import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import {
  createQueryChannelJoinOfUserIdAndChannelId,
  createQueryForJoinCountOfChannel,
  createQueryForPostCountOfChannel
} from '../lib/dbQueries'
import { ChannelResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

  // User data from Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  const user = result.isError ? null : (result.userFromJwt as { id: string; username: string; email: string })

  const database = fetchCosmosDatabase()
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const postsContainer = fetchCosmosContainer(database, 'Posts')

  const responses = await Promise.all([
    channelsContainer.item(id, id).read<ChannelResource>(),
    channelJoinsContainer.items.query<number>(createQueryForJoinCountOfChannel(id)).fetchAll(),
    user
      ? channelJoinsContainer.items.query<string>(createQueryChannelJoinOfUserIdAndChannelId(user.id, id)).fetchAll()
      : { resources: [false] },
    postsContainer.items.query<number>(createQueryForPostCountOfChannel(id)).fetchAll()
  ])

  const channel = responses[0].resource
  const joinCount = responses[1].resources[0]
  const amIJoined = !!responses[2].resources[0]
  const postsCount = responses[3].resources[0]

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
