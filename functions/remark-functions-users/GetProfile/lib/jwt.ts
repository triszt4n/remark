import * as jwt from 'jsonwebtoken'

export const readJWT = (jwtToken: string) => {
  return jwt.verify(jwtToken, process.env.JWT_PRIVATE_KEY)
}
