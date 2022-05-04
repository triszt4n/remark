import { NotificationView } from '@triszt4n/remark-types'
import { createContext, FC, useEffect, useState } from 'react'

export type NotificationsContextType = {
  notifications: NotificationView[]
}

export const NotificationsContext = createContext<NotificationsContextType>({
  notifications: []
})

export const NotificationsProvider: FC = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationView[]>([])
  useEffect(() => {
    setNotifications([])
    // ???
  }, [])
  // const { isLoading, data: notifications, error } = useQuery('currentUser', userModule.fetchCurrentUser)
  // Update model: isSent: boolean --> when queried, they change this to true, and never get it again

  return (
    <NotificationsContext.Provider
      value={{
        notifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}
