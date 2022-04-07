import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer } from '../lib/dbConfig'
import { ChannelResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string
  const channelsContainer = fetchCosmosContainer('Channels')

  // No Authorization needed

  // Query from DB
  await channelsContainer
    .item(id, id)
    .read<ChannelResource>()
    .then((response) => {
      context.log('[DEBUG] at GetChannel', response)

      const channel = response.resource

      if (channel == null) {
        context.res = {
          status: 404,
          body: { message: `Channel with id ${id} not found` }
        }
        return
      }

      context.res = {
        body: channel
      }
    })
    .catch((error) => {
      context.log('[ERROR] at GetChannel', error)
      context.res = {
        status: 500,
        body: { message: `Error in database: Could not read channel!` }
      }
    })
}

export default httpTrigger
