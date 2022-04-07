import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import axios from 'axios'
import { fetchCosmosContainer } from '../lib/dbConfig'
import { getOrCreateUserByEmail } from '../lib/dbQueries'
import { createJWT } from '../lib/jwtFunctions'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  // Request body verification
  if (!req.body || !req.body.accessToken) {
    context.res = {
      status: 400,
      body: { message: `Bad request: No accessToken in request body!` }
    }
    return
  }

  const { accessToken } = req.body
  const usersContainer = fetchCosmosContainer('Users')

  // Query from Google Resource server
  await axios
    .get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(async (response) => {
      const googleUser = response.data

      const dbUser = await getOrCreateUserByEmail(usersContainer, googleUser)
      const jwtToken = createJWT(dbUser)

      context.res = {
        body: {
          jwt: jwtToken,
          user: dbUser
        }
      }
    })
    .catch((error) => {
      context.log('[ERROR] at LoginUser', error)
      context.res = {
        body: { message: `Bad request for google oauth endpoint!` }
      }
    })
}

export default httpTrigger
