import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer } from '../lib/dbConfig'
import { createQueryByUsername } from '../lib/dbQueries'
import { UserResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const username = context.bindingData.username as string
  const usersContainer = fetchCosmosContainer('Users')
  const { resources: users } = await usersContainer.items.query<UserResource>(createQueryByUsername(username)).fetchAll()

  if (users.length == 0) {
    context.res = {
      status: 404,
      body: { message: `User with username ${username} not found.` }
    }
    return
  }

  const user = users[0]
  context.res = {
    body: user
  }
}

export default httpTrigger
