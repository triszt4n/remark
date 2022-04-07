import { Resource } from '@azure/cosmos'

export interface Channel {
  uriName: string
  title: string
  descRawMarkdown: string
  owner: string ///< id
  moderators: string[] ///< ids
  bannerUrl?: string
}

export interface ChannelJoin {
  user: string ///< id
  channel: string ///< id
}

export interface UpdateChannel {
  uriName: string
  title: string
  descRawMarkdown: string
  moderators: string[]
}

export type ChannelResource = Channel & Resource
