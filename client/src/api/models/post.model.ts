export interface Post {
  id: string
  createdAt: number
  publisherUsername: string
  rawMarkdown: string
  parentChannelUriName: string
  title: string
  voteCount: number
  myVote: 'up' | 'down' | 'none'
  imageUrl?: string
}

export interface UpdatePost {}
