import { Post } from './post.model'
import { User } from './user.model'

export interface Comment {
  id: string
  createdAt: number
  publisher: User
  rawMarkdown: string
  parentPost: Post
  vote: number
  amIPublisher: boolean
}
