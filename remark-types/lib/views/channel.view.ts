export interface ChannelView {
  id: string
  createdAt: number
  uriName: string
  title: string
  descRawMarkdown: string
  joinCount: number
  postsCount: number

  amIJoined: boolean
  joinedAt?: number // if amIJoined

  amIOwner: boolean
  amIModerator: boolean
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
