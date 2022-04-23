export interface ChannelModel {
  id: string
  uriName: string

  createdAt: number // unix
  title: string
  descRawMarkdown: string

  ownerId: string
  moderatorIds: string[]
}
