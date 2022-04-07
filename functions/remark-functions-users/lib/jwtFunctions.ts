import { HttpRequest } from '@azure/functions'
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

// These should be freely used in other function groups
export interface AuthorizationResponse {
  isError: boolean
  userFromJwt?: jwt.JwtPayload
  status?: number
  message?: string
}
export const readUserFromAuthHeader = (req: HttpRequest): AuthorizationResponse => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return {
      isError: true,
      status: 400,
      message: 'No Authorization header provided in request!'
    }
  }
  const jwtToken = authHeader.replace('Bearer', '').trim()

  try {
    const userFromJwt = jwt.verify(jwtToken, process.env.JWT_PRIVATE_KEY) as jwt.JwtPayload

    const hasAllTheRequiredProperties = 'id' in userFromJwt && 'username' in userFromJwt && 'email' in userFromJwt
    if (!userFromJwt || !hasAllTheRequiredProperties) {
      return {
        isError: true,
        status: 400,
        message: `JWT object does not have all the required properties!`
      }
    }

    return {
      isError: false,
      userFromJwt
    }
  } catch (error) {
    return {
      isError: true,
      status: 400,
      message: `No id found on jwt object!`
    }
  }
}
