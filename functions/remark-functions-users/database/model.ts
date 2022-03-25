import { Resource } from '@azure/cosmos'

export interface User {
  firstName: string
  lastName: string
  username: string
  email: string
  imageUrl?: string
}

export interface UpdateUser {
  username: string
}

export type UserResource = User & Resource
