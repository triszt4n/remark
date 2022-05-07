import { useToast } from '@chakra-ui/react'
import { NotificationView, UserView } from '@triszt4n/remark-types'
import { createContext, FC, useState } from 'react'
import { useMutation } from 'react-query'
import { rconsole } from '../../../util/remark-console'
import { notificationModule } from '../../modules/notification.module'
import { fetchSignalrConnection } from './signalrConnectionClient'

export type NotificationsContextType = {
  notifications: NotificationView[]
  startNotificationReception: (userId: UserView) => Promise<void>
  stopNotificationReception: () => void
  clearNotifications: () => void
  clearLoading: boolean
}

export const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  startNotificationReception: async () => {},
  stopNotificationReception: () => {},
  clearNotifications: () => {},
  clearLoading: false
})

export const NotificationsProvider: FC = ({ children }) => {
  const toast = useToast()
  const [notifications, setNotifications] = useState<NotificationView[]>([])
  const signalrConnection = fetchSignalrConnection()
  const mutation = useMutation(notificationModule.clearNotifications, {
    onSuccess: ({ data: { deletedIds } }) => {
      const newNotifications = notifications.filter((notif) => !deletedIds.includes(notif.id))
      setNotifications(newNotifications)
    },
    onError: (error) => {
      const err = error as any
      rconsole.log('Error at clearNotifications', err.toJSON())
      toast({
        title: 'Error occured when clearing notifications',
        description: `${err.response.status} ${err.response.data.message || err.message} Try again later.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const attachToNotifications = (newNotifications: NotificationView[]) => {
    setNotifications([...notifications, ...newNotifications])
  }

  const startConnection = async (userId: string) => {
    try {
      // start the new connection
      await signalrConnection.start()
      // on my messages, I will send to the others
      signalrConnection.on(`notif:${userId}`, (notification: NotificationView) => {
        attachToNotifications([notification])
      })
      rconsole.log('SignalR Connected!', signalrConnection.connectionId)
    } catch (err) {
      rconsole.log(err)
      setTimeout(startConnection, 5000)
    }
  }

  const stopConnection = async () => {
    try {
      // stop the connection
      await signalrConnection.stop()
      rconsole.log('SignalR Disconnected!')
    } catch (err) {
      rconsole.log(err)
      setTimeout(stopConnection, 5000)
    }
  }

  const clearNotifications = () => {
    mutation.mutate(notifications.map((notif) => notif.id))
  }

  const startNotificationReception = async (user: UserView) => {
    const notifs = await notificationModule.fetchNotifications()
    setNotifications(notifs)
    await startConnection(user.id)
  }

  const stopNotificationReception = async () => {
    await stopConnection()
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        startNotificationReception,
        stopNotificationReception,
        clearNotifications,
        clearLoading: mutation.isLoading
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}
