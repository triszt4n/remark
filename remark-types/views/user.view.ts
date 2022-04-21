export interface UserView {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  imageUrl?: string
}

export interface UpdateUserView {
  username: string
}
