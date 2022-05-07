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

export const createQueryNotificationsOfUser = (userId: string): SqlQuerySpec => ({
  query: `SELECT * FROM Notifications n WHERE n.userId = @userId`,
  parameters: [
    {
      name: '@userId',
      value: userId
    }
  ]
})
