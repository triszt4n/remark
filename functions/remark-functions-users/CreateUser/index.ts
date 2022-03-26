import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer } from '../database/config'
import { User } from '../database/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const usersContainer = fetchCosmosContainer('Users')
  const { firstName, lastName, username, email } = req.body
  if (!firstName || !lastName || !username || !email) {
    context.res = {
      status: 400,
      body: 'Could not create user: empty field in request body!'
    }
    return
  }

  const creatableUser: User = {
    firstName,
    lastName,
    username,
    email
  }

  await usersContainer.items
    .create(creatableUser)
    .then((response) => {
      const createdUser = response.resource
      context.res = {
        body: createdUser
      }
    })
    .catch((error) => {
      context.log('[ERROR] at CreateUser', error)
      context.res = {
        status: 500,
        body: { message: `Error in database: Could not create user!` }
      }
    })
}

export default httpTrigger
