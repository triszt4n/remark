import { SqlQuerySpec } from '@azure/cosmos'

export const createQueryNotificationsInIds = (notificationIds: string[]): SqlQuerySpec => ({
  query: 'SELECT * FROM Notifications n WHERE ARRAY_CONTAINS(@notifIds, n.id)',
  parameters: [
    {
      name: '@notifIds',
      value: notificationIds
    }
  ]
})

export const createQueryLatestUnsentNotificationsOfUser = (userId: string): SqlQuerySpec => ({
  query: 'SELECT * FROM Notifications n WHERE n.userId = @userId AND NOT n.isSent',
  parameters: [
    {
      name: '@userId',
      value: userId
    }
  ]
})

export const createQuerySentNotificationsOfUser = (userId: string): SqlQuerySpec => ({
  query: 'SELECT * FROM Notifications n WHERE n.userId = @userId AND n.isSent',
  parameters: [
    {
      name: '@userId',
      value: userId
    }
  ]
})
