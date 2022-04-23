export interface ChannelModel {
  uriName: string

  createdAt: number // unix
  title: string
  descRawMarkdown: string

  ownerId: string
  moderatorIds: string[]
}
