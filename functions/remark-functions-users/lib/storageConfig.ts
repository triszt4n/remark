import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'

export const fetchBlobContainer = (containerName: string): ContainerClient => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING)
  return blobServiceClient.getContainerClient(containerName)
}
