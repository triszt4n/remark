import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryLatestUnsentNotificationsOfUser } from '../lib/dbQueries'
import { NotificationResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest) {
  // User data from Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  if (result.isError) {
    context.res = {
      status: result.status,
      body: { message: result.message }
    }
    return
  }
  const { userFromJwt: user } = result

  const database = fetchCosmosDatabase()
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  const { resources: notifications } = await notificationsContainer.items
    .query<NotificationResource>(createQueryLatestUnsentNotificationsOfUser(user.id))
    .fetchAll()

  await Promise.all(
    notifications.map((notification) =>
      notificationsContainer.item(notification.id, notification.id).replace({ ...notification, isSent: true })
    )
  )

  context.res = {
    body: { updatedCount: notifications.length }
  }
}

export default httpTrigger
