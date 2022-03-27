import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer } from '../lib/config'
import { UserResource } from '../lib/model'
import { createQueryByUsername } from '../lib/query'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const username = context.bindingData.username as string
  const usersContainer = fetchCosmosContainer('Users')

  await usersContainer.items
    .query<UserResource>(createQueryByUsername(username))
    .fetchAll()
    .then((response) => {
      if (response.resources.length == 0) {
        context.res = {
          status: 404,
          body: { message: `User with username ${username} not found` }
        }
        return
      }

      const user = response.resources[0]
      context.res = {
        body: user
      }
    })
    .catch((error) => {
      context.log('[ERROR] at GetUser', error)
      context.res = {
        status: 500,
        body: { message: `Error in database: Could not read user!` }
      }
    })
}

export default httpTrigger
