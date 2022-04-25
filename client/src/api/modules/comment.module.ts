import { CommentModel, CreateCommentView, UpdateCommentView } from '@triszt4n/remark-types'
import axios from 'axios'

class CommentModule {
  async createComment(commentData: CreateCommentView) {
    const response = await axios.post<CommentModel & { id: string }>(`/comments/comments`, commentData)
    return response
  }

  async updateComment(id: string, commentData: UpdateCommentView) {
    const response = await axios.patch<CommentModel & { id: string }>(`/comments/comments/${id}`, commentData)
    return response
  }

  async deleteComment(id: string) {
    const response = await axios.delete<CommentModel & { id: string }>(`/comments/comments/${id}`)
    return response
  }
}

export const commentModule = new CommentModule()
