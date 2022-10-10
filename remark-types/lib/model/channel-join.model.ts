export interface ChannelJoinModel {
  createdAt: number // unix
  userId: string
  channelId: string
  isOwner: boolean
  isModerator: boolean
}
