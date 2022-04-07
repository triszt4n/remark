import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer } from '../lib/dbConfig'
import { createQueryByUriName } from '../lib/dbQueries'
import { ChannelResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const uriName = context.bindingData.uriName as string
  const channelsContainer = fetchCosmosContainer('Channels')

  // No Authorization needed

  // Query from DB
  await channelsContainer.items
    .query<ChannelResource>(createQueryByUriName(uriName))
    .fetchAll()
    .then((response) => {
      if (response.resources.length == 0) {
        context.res = {
          status: 404,
          body: { message: `Channel with uriName ${uriName} not found` }
        }
        return
      }

      const channel = response.resources[0]
      context.res = {
        body: channel
      }
    })
    .catch((error) => {
      context.log('[ERROR] at GetChannelByUriName', error)
      context.res = {
        status: 500,
        body: { message: `Error in database: Could not read channel!` }
      }
    })
}

export default httpTrigger
