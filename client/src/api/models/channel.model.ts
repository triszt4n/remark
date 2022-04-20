export interface Channel {
  createdAt: number
  uriName: string
  title: string
  descRawMarkdown: string
  joinedUserCount: number
  postsCount: number
  ownerUsername: string
  bannerUrl?: string
}

export interface UpdateChannel {}
