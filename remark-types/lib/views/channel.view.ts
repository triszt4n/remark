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
}

export interface CreateChannelView {
  uriName: string
  title: string
  descRawMarkdown: string
}

export interface UpdateChannelView extends CreateChannelView {}
