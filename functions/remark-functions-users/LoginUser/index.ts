import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import axios from 'axios'
import * as md5 from 'md5'
import { User } from '../database/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { accessToken } = req.body

  // fixme: try catch finally block
  await axios
    .get('??', {
      // todo: Don't know the resource uri :(
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response: any) => {
      const { data } = response
      if (typeof data !== 'object') {
        context.res = {
          status: 500,
          body: { message: 'Could not retrieve user data from Google resource server' }
        }
        return
      }

      const googleUser = data.user
      if (!googleUser || !data) {
        context.res = {
          status: 500,
          body: { message: 'Google resource server returned invalid user object' }
        }
        return
      }

      // todo: let's see in db if the user with email exists
      // use the GetUser Function for this purpose
      let dbUser: User

      // todo: if not, create it from googleUser using CreateUser Function
      const username = md5(googleUser.email)
      dbUser

      // todo: create jwt from CreateJWT Function
      let jwtToken = await axios.post('/jwt', {
        // fixme: url???
        username: dbUser.username,
        email: dbUser.email
      })

      context.res = {
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
