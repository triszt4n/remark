import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelPartialView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import {
  createQueryChannelJoinsOfUserId,
  createQueryExistsJoinOfUserIdAndChannelId,
  createQueryForJoinCountOfChannel
} from '../lib/dbQueries'
import { ChannelJoinResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

  // User data from Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  const user = result.isError ? null : (result.userFromJwt as { id: string; username: string; email: string })

  const database = fetchCosmosDatabase()
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const channelsContainer = fetchCosmosContainer(database, 'Channels')

  const { resources: channelJoins } = await channelJoinsContainer.items
    .query<ChannelJoinResource>(createQueryChannelJoinsOfUserId(id))
    .fetchAll()

  const channelPartials = await Promise.all(
    channelJoins.map(async (join) => {
      const { resource: channel } = await channelsContainer.item(join.channelId, join.channelId).read()

      const { joinCount } = (
        await channelJoinsContainer.items.query<{ joinCount: number }>(createQueryForJoinCountOfChannel(id)).fetchAll()
      ).resources[0]

      let amIJoined: boolean
      if (!user) {
        amIJoined = false
      } else if (id == user.id) {
        amIJoined = true
      } else {
        amIJoined =
          (
            await channelJoinsContainer.items
              .query<{ joinCount: number }>(createQueryExistsJoinOfUserIdAndChannelId(user.id, channel.id))
              .fetchAll()
          ).resources[0].joinCount > 0
      }

      const returnable: ChannelPartialView = {
        id: channel.id,
        uriName: channel.uriName,
        title: channel.title,
        joinCount,
        amIJoined,
        joinedAt: join.createdAt
      }
      return returnable
    })
  )

  context.res = {
    body: channelPartials
  }
}

export default httpTrigger
