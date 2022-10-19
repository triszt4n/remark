import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryByModeratorIds, createQueryChannelJoinsOfChannel } from '../lib/dbQueries'
import { ChannelJoinResource, UserResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

  const database = fetchCosmosDatabase()
  const channelJoinsContainer = fetchCosmosContainer(database, 'ChannelJoins')
  const { resources: channelJoins } = await channelJoinsContainer.items
    .query<ChannelJoinResource>(createQueryChannelJoinsOfChannel(id))
    .fetchAll()
  const moderatorIds = channelJoins.filter((join) => join.isModerator).map((join) => join.userId)
  const ownerId = channelJoins.find((join) => join.isOwner).userId

  const usersContainer = fetchCosmosContainer(database, 'Users')
  const { resources: moderatorsAndOwner } = await usersContainer.items
    .query<UserResource>(createQueryByModeratorIds(moderatorIds))
    .fetchAll()

  context.res = {
    body: {
      owner: moderatorsAndOwner.find((moderator) => moderator.id === ownerId),
      moderators: moderatorsAndOwner.filter((moderator) => moderator.id !== ownerId)
    }
  }
}

export default httpTrigger
