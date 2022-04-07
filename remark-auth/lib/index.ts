import * as jwt from 'jsonwebtoken'

export const createJWT = (user: { id: string; username: string; email: string }, jwtPrivateKey: string, expiresIn: number) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email
    },
    jwtPrivateKey,
    {
      algorithm: 'HS256',
      expiresIn: expiresIn
    }
  )
}

export interface AuthorizationResponse {
  isError: boolean
  userFromJwt?: jwt.JwtPayload
  status?: number
  message?: string
}

export const readUserFromAuthHeader = (req: any, jwtPrivateKey: string): AuthorizationResponse => {
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
    const userFromJwt = jwt.verify(jwtToken, jwtPrivateKey) as jwt.JwtPayload

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
