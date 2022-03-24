import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer } from '../database/config'
import { CreateUser } from '../database/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const usersContainer = fetchCosmosContainer('Users')

  const creatableUser: CreateUser = {
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  }

  const createdUser = await usersContainer.items.create({})

  context.res = {
    status: 200,
    body: createdUser
  }
}

export default httpTrigger
