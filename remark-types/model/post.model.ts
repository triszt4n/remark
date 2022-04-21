export interface PostModel {
  id: string

  createdAt: number // unix
  title: string
  rawMarkdown: string
  imageUrl: string | null

  publisherId: string
  parentChannelId: string
}
