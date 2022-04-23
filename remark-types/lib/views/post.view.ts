import { UserView } from './user.view'
import { MyVoteType } from './_commons.view'

export interface PostView {
  id: string
  createdAt: number
  publisher: UserView
  rawMarkdown: string
  parentChannelUriName: string
  title: string
  voteCount: number
  myVote: MyVoteType
  amIPublisher: boolean
  imageUrl?: string
}

export interface PostPartialView {
  id: string
  createdAt: number
  rawMarkdown: string
  parentChannelUriName: string
  title: string
  voteCount: number
  imageUrl?: string
}

export interface UpdatePostView {}
