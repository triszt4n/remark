import { Post } from './post.model'
import { User } from './user.model'

export interface Comment {
  createdAt: number
  publisher: User
  rawMarkdown: string
  parentPost: Post
  vote: number
}
