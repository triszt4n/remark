import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer } from '../database/config'
import { UserResource } from '../database/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const usersContainer = fetchCosmosContainer('Users')

  await usersContainer.items
    .readAll<UserResource>()
    .fetchAll()
    .then((response) => {
      const users = response.resources

      context.res = {
        body: users
      }
    })
    .catch((error) => {
      context.log('[ERROR] at GetUsers', error)
      context.res = {
        status: 500,
        body: { message: `Error in database: Could not read all users!` }
      }
    })
}

export default httpTrigger
