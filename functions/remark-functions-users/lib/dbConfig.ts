import { CosmosClient } from '@azure/cosmos'
import { RemarkDatabaseContainerId } from '@triszt4n/remark-types'

export const fetchCosmosContainer = (containerId: RemarkDatabaseContainerId) => {
  const client = new CosmosClient({ endpoint: process.env.COSMOS_DB_ENDPOINT, key: process.env.COSMOS_DB_KEY })
  const database = client.database(process.env.COSMOS_DB_DATABASE_ID)
  return database.container(containerId)
}
