import { User } from './user.model'
import { MyVoteType } from './_commons.model'

export interface Comment {
  id: string
  createdAt: number
  publisher: User
  rawMarkdown: string
  voteCount: number
  amIPublisher: boolean
  myVote: MyVoteType
}
