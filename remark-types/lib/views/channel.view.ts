export interface ChannelView {
  id: string
  createdAt: number
  uriName: string
  title: string
  descRawMarkdown: string
  joinCount: number
  postsCount: number
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
  joinedAt: number
}

export interface ChannelInPostView {
  id: string
  createdAt: number
  uriName: string
  title: string
  descRawMarkdown: string
  amIOwner: boolean
  amIModerator: boolean
}

export interface UpdateChannelView {
  title: string
  descRawMarkdown: string
}

export interface CreateChannelView extends UpdateChannelView {
  uriName: string
}
