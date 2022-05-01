export interface UserView {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  imageUrl?: string
}

export interface CreateUserView {
  firstName: string
  lastName: string
  username: string
  email: string
}

export interface UpdateUserView {
  username: string
}

export interface UpdateUserImageView {
  imageFile: File
}
