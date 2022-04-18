export interface Channel {
  createdAt: number
  uriName: string
  title: string
  descRawMarkdown: string
  joinedUserCount: number // no trigger, only COUNT sql statement in ChannelJoin container!
  owner: string // id
  moderators: string[] // ids
  posts: string[] // ids
  bannerUrl?: string
}

export interface UpdateChannel {}
