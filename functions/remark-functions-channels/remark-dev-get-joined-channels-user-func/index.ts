import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelModel, ChannelView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import {
  createQueryChannelJoinOfUserIdAndChannelId,
  createQueryChannelJoinsOfUserId,
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

  const channels = await Promise.all(
    channelJoins.map(async (join) => {
      const { resource: channel } = await channelsContainer.item(join.channelId, join.channelId).read<ChannelModel>()

      const { joinCount } = (
        await channelJoinsContainer.items.query<{ joinCount: number }>(createQueryForJoinCountOfChannel(join.channelId)).fetchAll()
      ).resources[0]

      let amIJoined: boolean, amIOwner: boolean, amIModerator: boolean
      let joinedAt: number = join.createdAt

      if (!user) {
        amIJoined = false
        amIOwner = false
        amIModerator = false
      } else if (id == user.id) {
        amIJoined = true
        amIOwner = join.isOwner
        amIModerator = join.isModerator
      } else {
        const { resources: requesterJoins } = await channelJoinsContainer.items
          .query<ChannelJoinResource>(createQueryChannelJoinOfUserIdAndChannelId(user.id, channel.id))
          .fetchAll()
        if (requesterJoins.length > 0) {
          amIJoined = true
          joinedAt = requesterJoins[0].createdAt
          amIOwner = requesterJoins[0].isOwner
          amIModerator = requesterJoins[0].isModerator
        }
      }

      const returnable: ChannelView = {
        ...channel,
        joinCount,
        amIJoined,
        joinedAt,
        postsCount: 0, // irrelevant data here
        amIOwner,
        amIModerator
      }
      return returnable
    })
  )

  context.res = {
    body: channels
  }
}

export default httpTrigger
