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
  parentPostId: string
}

export interface UpdateCommentView {
  rawMarkdown: string
}

export interface CreateCommentView extends UpdateCommentView {
  parentPostId: string
}
