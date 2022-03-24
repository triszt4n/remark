export interface CreateUser {
  firstName: string
  lastName: string
  username: string
  email: string
}

export interface UpdateUser {
  username: string
}

export interface User extends CreateUser {
  id: string
  imageUrl?: string
}
