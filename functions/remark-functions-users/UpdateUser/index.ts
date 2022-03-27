import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer } from '../lib/config'
import { UserResource } from '../lib/model'
import { createQueryByUsername } from '../lib/query'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  // Validate req body
  if (!req.body || !req.body.username) {
    context.res = {
      status: 400,
      body: { message: `Bad request: No username in request body!` }
    }
    return
  }

  const id = context.bindingData.id as string
  const newUsername = req.body.username as string
  const usersContainer = fetchCosmosContainer('Users')

  // Validate new username is unique
  const { resources: usersWithSameUsername } = await usersContainer.items.query<UserResource>(createQueryByUsername(newUsername)).fetchAll()
  if (usersWithSameUsername.length > 0) {
    context.res = {
      status: 400,
      body: { message: `User with username ${newUsername} already exists` }
    }
    return
  }

  // Get user of id
  const { resource: user } = await usersContainer.item(id, id).read<UserResource>()
  if (user == null) {
    context.res = {
      status: 404,
      body: { message: `User with id ${id} not found` }
    }
    return
  }

  // todo: Check if the requester in authorization header is the same as the user just fetched above!

  user.username = newUsername
  const { resource: updatedUser } = await usersContainer.item(id, id).replace<UserResource>(user)

  context.res = {
    body: updatedUser
  }
}

export default httpTrigger
