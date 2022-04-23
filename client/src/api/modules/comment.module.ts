import { CreateCommentView, UpdateCommentView } from '@triszt4n/remark-types'
import axios from 'axios'

class CommentModule {
  async createComment(commentData: CreateCommentView) {
    const response = await axios.post<CreateCommentView>(`/comments/comments`, commentData)
    return response
  }

  async updateComment(id: string, commentData: UpdateCommentView) {
    const response = await axios.patch<UpdateCommentView>(`/comments/comments/${id}`, commentData)
    return response
  }
}

export const commentModule = new CommentModule()
