import { useToast } from '@chakra-ui/react'
import { NotificationView } from '@triszt4n/remark-types'
import { createContext, FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { notificationModule } from '../../modules/notification.module'
import { LocalStorageKeys } from '../LocalStorageKeys'
import { signalrConnection } from './signalrConnectionClient'

export type NotificationsContextType = {
  notifications: NotificationView[]
}

export const NotificationsContext = createContext<NotificationsContextType>({
  notifications: []
})

export const NotificationsProvider: FC = ({ children }) => {
  const toast = useToast()
  const errToast = (err: any) =>
    toast({
      title: 'Notifications cannot be retrieved',
      description: `Error at latestUnsentNotifications ${err?.response.data.message || err.message}`,
      status: 'error',
      duration: 5000,
      isClosable: true
    })

  const { data: latestUnsentNotifications, error } = useQuery('latestUnsentNotifications', notificationModule.fetchUnsentNotifications)

  const [storedNotifications, setStoredNotifications, resetStoredNotifications] = useLocalStorage<NotificationView[]>(
    LocalStorageKeys.REMARK_LATEST_NOTIFICATIONS,
    []
  )
  const [notifications, setNotifications] = useState<NotificationView[]>(storedNotifications)

  const attachToNotifications = (notifs?: NotificationView[]) => {
    if (!notifs) return

    let newNotifications = [...notifications]
    if (latestUnsentNotifications) {
      newNotifications.push(...latestUnsentNotifications)
    }
    setNotifications(newNotifications)
    setStoredNotifications(newNotifications)
  }

  const updateToSent = async (notifs?: NotificationView[]): Promise<{ updatedCount: number }> => {
    if (notifs) {
      const { data } = await notificationModule.updateUnsentsToSent(notifs.map((v) => v.id))
      return data
    }
    return { updatedCount: 0 }
  }

  const startConnection = async () => {
    try {
      await signalrConnection.start()
      console.log('[DEBUG] SignalR Connected!', signalrConnection.connectionId)
    } catch (err) {
      console.log(err)
      setTimeout(startConnection, 5000)
    }
  }

  useEffect(() => {
    signalrConnection.onclose(async () => {
      await startConnection()
    })
  }, [])

  useEffect(() => {
    if (error) {
      errToast(error as any)
    } else {
      startConnection()
      attachToNotifications(latestUnsentNotifications)
      updateToSent(latestUnsentNotifications)
    }
  }, [latestUnsentNotifications])

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
