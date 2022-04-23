export interface CommentModel {
  createdAt: number // unix
  rawMarkdown: string

  publisherId: string
  parentPostId: string
}
