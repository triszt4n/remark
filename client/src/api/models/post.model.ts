import { User } from './user.model'
import { MyVoteType } from './_commons.model'

export interface Post {
  id: string
  createdAt: number
  publisher: User
  rawMarkdown: string
  parentChannelUriName: string
  title: string
  voteCount: number
  myVote: MyVoteType
  amIPublisher: boolean
  imageUrl?: string
}

export interface UpdatePost {}
