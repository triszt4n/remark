import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import {
  createQueryChannelJoinOfUserIdAndChannelId,
  createQueryForJoinCountOfChannel,
  createQueryForPostCountOfChannel
} from '../lib/dbQueries'
import { ChannelJoinResource, ChannelResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  // User data from Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  const user = result.isError ? null : (result.userFromJwt as { id: string; username: string; email: string })

  const database = fetchCosmosDatabase()
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const { resources: channels } = await channelsContainer.items.readAll<ChannelResource>().fetchAll()

  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')

  const returnables = await Promise.all(
    channels.map(async (channel) => {
      const [res1, res2, res3] = await Promise.all([
        channelJoinsContainer.items.query<{ joinCount: number }>(createQueryForJoinCountOfChannel(channel.id)).fetchAll(),
        postsContainer.items.query<{ postsCount: number }>(createQueryForPostCountOfChannel(channel.id)).fetchAll(),
        user
          ? channelJoinsContainer.items
              .query<ChannelJoinResource>(createQueryChannelJoinOfUserIdAndChannelId(user.id, channel.id))
              .fetchAll()
          : null
      ])

      const { joinCount } = res1.resources[0]
      const { postsCount } = res2.resources[0]
      const amIJoined = res3 ? res3.resources.length > 0 : false
      const amIOwner = user ? user.id === channel.ownerId : false
      const amIModerator = user ? channel.moderatorIds.includes(user.id) : false

      const returnable: ChannelView = {
        ...channel,
        joinCount,
        postsCount,
        amIJoined,
        amIOwner,
        amIModerator
      }
      return returnable
    })
  )

  context.res = {
    body: returnables
  }
}

export default httpTrigger
