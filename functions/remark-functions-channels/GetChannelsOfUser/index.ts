import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer } from '../lib/dbConfig'
import { createQueryByOwnerUsername } from '../lib/dbQueries'
import { ChannelResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const username = context.bindingData.username as string
  const channelsContainer = fetchCosmosContainer('Channels')

  // No Authorization needed

  // Query from DB
  await channelsContainer.items
    .query<ChannelResource>(createQueryByOwnerUsername(username))
    .fetchAll()
    .then((response) => {
      const channels = response.resources
      context.res = {
        body: channels
      }
    })
    .catch((error) => {
      context.log('[ERROR] at GetChannelsOfUser', error)
      context.res = {
        status: 500,
        body: { message: `Error in database: Could not read channels!` }
      }
    })
}

export default httpTrigger
