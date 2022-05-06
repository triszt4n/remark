import { NotificationView } from '@triszt4n/remark-types'
import axios from 'axios'

class NotificationModule {
  async fetchUnsentNotifications(): Promise<NotificationView[]> {
    const response = await axios.get<NotificationView[]>(`/notifications/notifications/unsents`)
    return response.data
  }

  async updateUnsentsToSent(notificationIds: string[]) {
    return axios.patch<{ updatedCount: number }>(`/notifications/notifications/unsent-to-sent`, { notificationIds })
  }

  async clearSentNotifications(notificationIds: string[]) {
    return axios.delete<{ deletedCount: number }>(`/notifications/notifications/sents`, { data: { notificationIds } })
  }
}

export const notificationModule = new NotificationModule()
