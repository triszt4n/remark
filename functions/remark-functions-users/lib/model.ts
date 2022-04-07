import { Resource } from '@azure/cosmos'

export interface User {
  firstName: string
  lastName: string
  username: string
  email: string
  imageUrl?: string
  isTheLoggedInUser?: boolean
}

export interface GoogleUser {
  given_name: string
  family_name: string
  email: string
}

export interface UpdateUser {
  username: string
}

export type UserResource = User & Resource
