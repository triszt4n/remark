import { CosmosClient } from '@azure/cosmos'
import { RemarkDatabaseContainerId } from '@triszt4n/remark-types'

const client = new CosmosClient({ endpoint: process.env.COSMOS_DB_ENDPOINT, key: process.env.COSMOS_DB_KEY })
const database = client.database(process.env.COSMOS_DB_DATABASE_ID)

export const fetchCosmosContainer = (containerId: RemarkDatabaseContainerId) => {
  return database.container(containerId)
}
