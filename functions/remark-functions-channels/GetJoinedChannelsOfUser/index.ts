import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { ChannelJoinModel, ChannelPartialView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryChannelJoinsOfUserId, createQueryForJoinCountOfChannel } from '../lib/dbQueries'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

  const database = fetchCosmosDatabase()
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const channelsContainer = fetchCosmosContainer(database, 'Channels')

  const { resources: channelJoins } = await channelJoinsContainer.items
    .query<ChannelJoinModel>(createQueryChannelJoinsOfUserId(id))
    .fetchAll()

  const channelPartials = await Promise.all(
    channelJoins.map(async (join) => {
      const { resource: channel } = await channelsContainer.item(join.channelId, join.channelId).read()
      const joinCount = (await channelJoinsContainer.items.query<number>(createQueryForJoinCountOfChannel(id)).fetchAll()).resources[0]
      const returnable: ChannelPartialView = {
        id: channel.id,
        uriName: channel.uriName,
        title: channel.title,
        joinCount,
        amIJoined: true,
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
