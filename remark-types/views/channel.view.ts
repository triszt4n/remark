export interface ChannelView {
  id: string
  createdAt: number
  uriName: string
  title: string
  descRawMarkdown: string
  joinCount: number
  postsCount: number
  ownerUsername: string
  amIJoined: boolean
  amIOwner: boolean
  amIModerator: boolean
}

export interface ChannelPartialView {
  id: string
  uriName: string
  title: string
  joinCount: number
  amIJoined: boolean
}

export interface UpdateChannelView {}
