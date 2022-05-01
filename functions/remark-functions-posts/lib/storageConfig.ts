import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'

export const fetchBlobContainer = (containerName: string): ContainerClient => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    `DefaultEndpointsProtocol=https;` +
      `AccountName=${process.env.STORAGE_ACCOUNT_NAME};` +
      `AccountKey=${process.env.STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`
  )
  return blobServiceClient.getContainerClient(containerName)
}
