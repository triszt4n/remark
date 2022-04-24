import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryByModeratorIds } from '../lib/dbQueries'
import { ChannelResource, UserResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

  const database = fetchCosmosDatabase()
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const channelItem = channelsContainer.item(id, id)
  const { resource: channel } = await channelItem.read<ChannelResource>()
  if (!channel) {
    context.res = {
      status: 404,
      body: { message: `Channel with id ${id} not found.` }
    }
    return
  }

  const { moderatorIds, ownerId } = channel

  const usersContainer = fetchCosmosContainer(database, 'Users')
  const [{ resource: owner }, { resources: moderators }] = await Promise.all([
    usersContainer.item(ownerId, ownerId).read<UserResource>(),
    usersContainer.items.query<UserResource>(createQueryByModeratorIds(moderatorIds)).fetchAll()
  ])

  context.res = {
    body: {
      owner,
      moderators
    }
  }
}

export default httpTrigger
