export interface NotificationModel {
  createdAt: number // unix
  messageTitle: string
  messageBody: string
  isSent: boolean // false when creating

  userId: string
}
