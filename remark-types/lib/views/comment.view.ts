import { UserView } from './user.view'
import { MyVoteType } from './_commons.view'

export interface CommentView {
  id: string
  createdAt: number
  publisher: UserView
  rawMarkdown: string
  voteCount: number
  amIPublisher: boolean
  myVote: MyVoteType
}

export interface CreateCommentView {
  rawMarkdown: string
}

export interface UpdateCommentView extends CreateCommentView {}
