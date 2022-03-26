import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { fetchCosmosContainer } from '../database/config'
import { GoogleUser } from '../database/model'
import { createJWT } from './lib/jwt'
import { getGoogleUser, getOrCreateUserByEmail } from './lib/user'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { accessToken } = req.body
  const usersContainer = fetchCosmosContainer('Users')

  const googleUser: GoogleUser = await getGoogleUser(accessToken)
  const dbUser = await getOrCreateUserByEmail(usersContainer, googleUser)
  const jwtToken = createJWT(dbUser)

  context.res = {
    body: {
      jwt: jwtToken,
      user: dbUser
    }
  }
}

export default httpTrigger
