import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { UpdateUserImageView } from '@triszt4n/remark-types'
import { fetchCosmosContainer } from '../lib/dbConfig'
import { UserResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  // Request body verification
  if (!req.body || !req.body.imageFileData) {
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

  const { imageFileData } = req.body as UpdateUserImageView
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
  // todo: realize upload of imageFileData to Azure Blob Storage, retrieve public url and send down
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
