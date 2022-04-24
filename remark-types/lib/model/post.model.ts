export interface PostModel {
  createdAt: number // unix
  title: string
  rawMarkdown: string

  publisherId: string
  parentChannelId: string

  imageUrl?: string
}
