export interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  imageUrl?: string
}

export interface UpdateUser {
  username: string
}
