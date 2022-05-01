import { CommentModel, CommentView, CommentVoteModel, CreateCommentView, MyVoteType, UpdateCommentView } from '@triszt4n/remark-types'
import axios from 'axios'

class CommentModule {
  async fetchComment(id: string) {
    const response = await axios.get<CommentView>(`/comments/comments/${id}`)
    return response.data
  }

  async createComment(commentData: CreateCommentView) {
    return axios.post<CommentModel & { id: string }>(`/comments/comments`, commentData)
  }

  async updateComment({ id, commentData }: { id: string; commentData: UpdateCommentView }) {
    return axios.patch<CommentModel & { id: string }>(`/comments/comments/${id}`, commentData)
  }

  async deleteComment(id: string) {
    return axios.delete<CommentModel & { id: string }>(`/comments/comments/${id}`)
  }

  async voteComment({ id, voteType }: { id: string; voteType: MyVoteType }) {
    return axios.post<CommentVoteModel & { id: string }>(`/comments/comments/${id}/vote`, { intent: voteType })
  }
}

export const commentModule = new CommentModule()
