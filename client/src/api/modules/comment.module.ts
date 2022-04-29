import { CommentModel, CommentVoteModel, CreateCommentView, MyVoteType, UpdateCommentView } from '@triszt4n/remark-types'
import axios from 'axios'

class CommentModule {
  async createComment(commentData: CreateCommentView) {
    const response = await axios.post<CommentModel & { id: string }>(`/comments/comments`, commentData)
    return response
  }

  async updateComment({ id, commentData }: { id: string; commentData: UpdateCommentView }) {
    const response = await axios.patch<CommentModel & { id: string }>(`/comments/comments/${id}`, commentData)
    return response
  }

  async deleteComment(id: string) {
    const response = await axios.delete<CommentModel & { id: string }>(`/comments/comments/${id}`)
    return response
  }

  async voteComment({ id, voteType }: { id: string; voteType: MyVoteType }) {
    const response = await axios.post<CommentVoteModel & { id: string }>(`/comments/comments/${id}/vote`, { intent: voteType })
    return response
  }
}

export const commentModule = new CommentModule()
