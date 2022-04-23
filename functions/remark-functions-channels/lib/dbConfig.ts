import { CosmosClient, Database } from '@azure/cosmos'
import { RemarkDatabaseContainerId } from '@triszt4n/remark-types'

export const fetchCosmosDatabase = () => {
  const client = new CosmosClient({ endpoint: process.env.COSMOS_DB_ENDPOINT, key: process.env.COSMOS_DB_KEY })
  return client.database(process.env.COSMOS_DB_DATABASE_ID)
}

export const fetchCosmosContainer = (database: Database, containerId: RemarkDatabaseContainerId) => {
  return database.container(containerId)
}
