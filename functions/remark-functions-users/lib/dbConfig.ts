import { CosmosClient } from '@azure/cosmos'
import { RemarkDatabaseContainerId } from '@triszt4n/remark-types'

const COSMOS_DB_CONFIG_OBJ = {
  endpoint: process.env.COSMOS_DB_ENDPOINT,
  key: process.env.COSMOS_DB_KEY,
  databaseId: process.env.COSMOS_DB_DATABASE_ID
}

export const fetchCosmosContainer = (containerId: RemarkDatabaseContainerId) => {
  const { endpoint, key, databaseId } = COSMOS_DB_CONFIG_OBJ
  const client = new CosmosClient({ endpoint, key })
  const database = client.database(databaseId)
  return database.container(containerId)
}
