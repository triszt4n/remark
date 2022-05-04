import { CommentView } from '@triszt4n/remark-types'
import axios from 'axios'

class NotificationModule {
  async fetchComment(id: string) {
    const response = await axios.get<CommentView>(`/comments/comments/${id}`)
    return response.data
  }
}

export const notificationModule = new NotificationModule()
