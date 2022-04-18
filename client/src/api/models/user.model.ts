export interface User {
  firstName: string
  lastName: string
  username: string
  email: string
  id: string
  imageUrl?: string
}

export interface FullUser {
  firstName: string
  lastName: string
  username: string
  email: string
  id: string
  channels: string[] // ids
  posts: string[] // ids
  // comments: string[] // ids, later to be used on user page
  imageUrl?: string
}

export interface UpdateUser {
  username: string
}
