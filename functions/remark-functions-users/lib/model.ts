import { Resource } from '@azure/cosmos'
import { UserModel } from '@triszt4n/remark-types'

export interface GoogleUser {
  given_name: string
  family_name: string
  email: string
}

export type UserResource = UserModel & Resource
