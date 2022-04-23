export interface CommentModel {
  id: string

  createdAt: number // unix
  rawMarkdown: string

  publisherId: string
  parentPostId: string
}
