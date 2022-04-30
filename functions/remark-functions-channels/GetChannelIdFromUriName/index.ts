import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryByUriName } from '../lib/dbQueries'
import { ChannelResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const uriName = context.bindingData.uriName as string

  const database = fetchCosmosDatabase()
  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const { resources } = await channelsContainer.items.query<ChannelResource>(createQueryByUriName(uriName)).fetchAll()
  if (resources.length == 0) {
    context.res = {
      status: 404,
      body: { message: `Channel with uriName ${uriName} not found.` }
    }
    return
  }

  const returnable = {
    id: resources[0].id
  }

  context.res = {
    body: returnable
  }
}

export default httpTrigger
