import { Channel } from './channel.model'
import { User } from './user.model'

export interface Post {
  createdAt: number
  publisher: User
  rawMarkdown: string
  parentChannel: Channel
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
