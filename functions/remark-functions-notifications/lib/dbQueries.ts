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

type SentStatus = 'UNSENT' | 'SENT' | 'DONTCARE'
export const createQueryNotificationsOfUser = (userId: string, sentStatus: SentStatus = 'DONTCARE'): SqlQuerySpec => {
  let sendQueryPartial = ''
  switch (sentStatus) {
    case 'SENT':
      sendQueryPartial = ' AND n.isSent'
      break
    case 'UNSENT':
      sendQueryPartial = ' AND NOT n.isSent'
      break
  }
  return {
    query: `SELECT * FROM Notifications n WHERE n.userId = @userId${sendQueryPartial}`,
    parameters: [
      {
        name: '@userId',
        value: userId
      }
    ]
  }
}
