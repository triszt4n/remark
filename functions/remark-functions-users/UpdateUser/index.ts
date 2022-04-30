import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { fetchCosmosContainer } from '../lib/dbConfig'
import { createQueryByUsername } from '../lib/dbQueries'
import { UserResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  // Request body verification
  if (!req.body || !req.body.username) {
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

  const id = context.bindingData.id as string
  const newUsername = req.body.username as string
  const usersContainer = fetchCosmosContainer('Users')

  // Validate new username is unique
  const { resources: usersWithSameUsername } = await usersContainer.items.query<UserResource>(createQueryByUsername(newUsername)).fetchAll()
  if (usersWithSameUsername.length > 0) {
    context.res = {
      status: 400,
      body: { message: `User with username ${newUsername} already exists.` }
    }
    return
  }

  // Get user of id
  const { resource: user } = await usersContainer.item(id, id).read<UserResource>()
  if (user == null) {
    context.res = {
      status: 404,
      body: { message: `User with id ${id} not found.` }
    }
    return
  }

  // Check if the requester in authorization header is the same as the user just fetched above!
  if (userFromJwt.id !== user.id) {
    context.res = {
      status: 401,
      body: { message: `Unauthorized action: Requester is not the same as the updatable user!` }
    }
    return
  }

  // Actual username update
  user.username = newUsername
  const { resource: updatedUser } = await usersContainer.item(id, id).replace<UserResource>(user)

  context.res = {
    body: updatedUser
  }
}

export default httpTrigger
