export interface NotificationModel {
  id: string

  createdAt: number // unix
  messageTitle: string
  messageBody: string

  userId: string
}
