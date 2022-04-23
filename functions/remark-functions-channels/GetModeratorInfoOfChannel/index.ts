import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { ChannelModel, UserModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryByModeratorIds } from '../lib/dbQueries'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

  const database = fetchCosmosDatabase()
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const channelItem = channelsContainer.item(id, id)
  const { resource: channel } = await channelItem.read<ChannelModel>()
  const { moderatorIds, ownerId } = channel

  const usersContainer = fetchCosmosContainer(database, 'Users')
  // todo: parallelize these below
  const { resource: owner } = await usersContainer.item(ownerId, ownerId).read<UserModel>()
  const { resources: moderators } = await usersContainer.items.query<UserModel>(createQueryByModeratorIds(moderatorIds)).fetchAll()

  context.res = {
    body: {
      owner,
      moderators
    }
  }
}

export default httpTrigger
