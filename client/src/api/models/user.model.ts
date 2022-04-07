export interface User {
  firstName: string
  lastName: string
  username: string
  email: string
  id: string
  imageUrl?: string
  isTheLoggedInUser?: boolean
}

export interface UpdateUser {
  username: string
}
