import { User } from './user.model'

export interface Post {
  createdAt: number
  publisherUsername: string
  rawMarkdown: string
  parentChannelUriName: string
  title: string
  votes: number
}

export interface PostPreview {
  createdAt: number
  publisher: User
  rawMarkdown: string
  title: string
  votes: number
}

export interface UpdatePost {}
