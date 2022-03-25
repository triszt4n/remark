import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { sign } from 'jsonwebtoken'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const { username, email } = req.body
  if (!username || !email) {
    context.res = {
      state: 400,
      body: { message: `Could not create JWT: empty email and/or username field in body!` }
    }
    return
  }

  const jwtToken = sign(
    {
      username: username,
      email: email
    },
    process.env.JWT_PRIVATE_KEY,
    {
      algorithm: 'HS256',
      expiresIn: 2 * 24 * 60 * 60 // two days
    }
  )

  context.res = {
    body: { jwtToken }
  }
}

export default httpTrigger
