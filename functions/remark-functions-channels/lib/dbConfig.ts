import { CosmosClient } from '@azure/cosmos'

const COSMOS_DB_CONFIG_OBJ = {
  endpoint: 'https://remark-cosmos-db.documents.azure.com:443/',
  key: process.env.COSMOS_DB_KEY,
  databaseId: process.env.COSMOS_DB_DATABASE_ID,
  partitionKey: { kind: 'Hash', paths: ['/id'] }
}

type RemarkDatabaseContainerId = 'Users' | 'Posts' | 'Channels' | 'Comments'

export const fetchCosmosContainer = (containerId: RemarkDatabaseContainerId) => {
  const { endpoint, key, databaseId } = COSMOS_DB_CONFIG_OBJ
  const client = new CosmosClient({ endpoint, key })
  const database = client.database(databaseId)
  return database.container(containerId)
}
