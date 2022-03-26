import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { JwtPayload } from 'jsonwebtoken'
import { fetchCosmosContainer } from '../database/config'
import { User } from '../database/model'
import { readJWT } from './lib/jwt'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const usersContainer = fetchCosmosContainer('Users')

  const authorizationHeader = req.headers['authorization']

  if (!authorizationHeader) {
    context.res = {
      status: 400,
      body: { message: `No Authorization header attached!` }
    }
    return
  }

  const jwtToken = authorizationHeader.replace('Bearer', '').trim()

  const jwtUser = readJWT(jwtToken) as JwtPayload
  if (!jwtUser || typeof jwtUser.id === 'undefined') {
    context.res = {
      status: 400,
      body: { message: `No id found on jwt object!` }
    }
    return
  }

  await usersContainer
    .item(jwtUser.id)
    .read<User>()
    .then((response) => {
      const user = response.resource

      if (user == null) {
        context.res = {
          status: 404,
          body: { message: `User with id ${jwtUser.id} not found` }
        }
        return
      }

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
