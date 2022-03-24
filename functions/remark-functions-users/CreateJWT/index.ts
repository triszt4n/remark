import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { sign } from 'jsonwebtoken'
import fetch from 'node-fetch'
import { User } from '../database/model'
import md5 = require('md5')

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { accessToken } = req.body

  await fetch('??', {
    // todo: Don't know the resource uri :(
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  })
    .then((response) => response.json())
    .then((response: any) => {
      if (typeof response !== 'object') {
        context.res = {
          status: 500,
          body: { message: 'Could not retrieve user data from Google resource server' }
        }
        return
      }

      const googleUser = response.user
      if (!googleUser || !response) {
        context.res = {
          status: 500,
          body: { message: 'Google resource server returned invalid user object' }
        }
        return
      }

      // todo: let's see in db if the user with email exists
      // use the GetUser Function for this purpose
      let dbUser: User

      // todo: if not, create it from googleUser
      const username = md5(googleUser.email)
      dbUser

      const jwtToken = sign(
        {
          username: dbUser.username,
          email: dbUser.email
        },
        process.env.JWT_PRIVATE_KEY,
        {
          algorithm: 'HS256',
          expiresIn: 2 * 24 * 60 * 60 // two days
        }
      )
      context.res = {
        status: 200,
        body: {
          jwt: jwtToken,
          user: dbUser
        }
      }
      return
    })
    .catch((error) => {
      context.log('[ERROR]', error)

      context.res = {
        status: 400,
        body: { message: 'Google resource server API endpoint is invalid' }
      }
    })
}

export default httpTrigger
