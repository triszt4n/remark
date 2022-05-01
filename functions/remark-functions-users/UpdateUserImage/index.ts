import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { formidable } from 'formidable'
import { v4 as uuidv4 } from 'uuid'
import { fetchCosmosContainer } from '../lib/dbConfig'
import { UserResource } from '../lib/model'
import { fetchBlobContainer } from '../lib/storageConfig'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  // Request body verification
  if (!req.body) {
    context.res = {
      status: 400,
      body: { message: `Bad request: No username in request body!` }
    }
    return
  }

  // Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  if (result.isError) {
    context.res = {
      status: result.status,
      body: { message: result.message }
    }
    return
  }
  const { userFromJwt } = result

  const { imageFileData } = req.body

  const form = formidable({ multiples: false })
  form.parse(imageFileData, (err, fields, files) => {
    if (err) {
      context.log('[ERROR] at form.parse', err)
      return
    }
    context.log(JSON.stringify({ fields, files }, null, 2))
  })

  const fileItself = imageFileData.file
  context.log('imageFileData', imageFileData)
  context.log('imageFileData[file]', fileItself)
  const usersContainer = fetchCosmosContainer('Users')

  // Get user of id
  const userItem = usersContainer.item(userFromJwt.id, userFromJwt.id)
  let { resource: user } = await userItem.read<UserResource>()
  if (!user) {
    context.res = {
      status: 404,
      body: { message: `User with id ${userFromJwt.id} not found.` }
    }
    return
  }

  // Upload as Blob
  const blobContainer = fetchBlobContainer('remark-images-container')
  const blobName = `${user.username}-${uuidv4()}-${'asd'}`

  context.log('Blob name', blobName)
  return

  const blockBlobClient = blobContainer.getBlockBlobClient(blobName)
  blockBlobClient.setTags({ userId: user.id })

  // Upload data to the blob
  const data = (fileItself as File).stream().read() as Buffer
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length)

  const imageUrl = ''

  user = {
    ...user,
    imageUrl
  }
  const { resource: updatedUser } = await userItem.replace<UserResource>(user)

  context.res = {
    body: updatedUser
  }
}

export default httpTrigger
