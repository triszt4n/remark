export interface NotificationView {
  id: string
  createdAt: number
  messageTitle: string
  messageBody: string
  isSent: boolean
  userId: string
}

// todo: message should be an object
export interface CreateNotificationView {
  messageTitle: string
  messageBody: string
  userId: string
}
