import * as jwt from 'jsonwebtoken'
import { UserResource } from './model'

export const createJWT = (user: UserResource) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email
    },
    process.env.JWT_PRIVATE_KEY,
    {
      algorithm: 'HS256',
      expiresIn: 2 * 24 * 60 * 60 // two days
    }
  )
}

export const readJWT = (jwtToken: string) => {
  return jwt.verify(jwtToken, process.env.JWT_PRIVATE_KEY)
}
