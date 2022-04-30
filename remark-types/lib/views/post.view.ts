import { ChannelInPostView } from './channel.view'
import { UserView } from './user.view'
import { MyVoteType } from './_commons.view'

export interface PostView {
  id: string
  createdAt: number
  publisher: UserView
  rawMarkdown: string
  channel: ChannelInPostView
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
  channel: ChannelInPostView
  title: string
  voteCount: number
  imageUrl?: string
}

export interface UpdatePostView {
  rawMarkdown: string
  title: string
}

export interface CreatePostView extends UpdatePostView {
  parentChannelId: string
  imageFileData?: File
}
