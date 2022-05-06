import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryNotificationsInIds } from '../lib/dbQueries'
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

  const { notificationIds } = req.body as { notificationIds: string[] }
  if (!notificationIds) {
    context.res = {
      status: 400,
      body: { message: `Request body field(s) failed validation.` }
    }
    return
  }

  const database = fetchCosmosDatabase()
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  const { resources: notifs } = await notificationsContainer.items
    .query<NotificationResource>(createQueryNotificationsInIds(notificationIds))
    .fetchAll()

  // Make it sure, that the caller updates only their notifications!
  if (notifs.some((notif) => notif.userId != user.id)) {
    context.res = {
      status: 403,
      body: { message: `Forbidden: Caller is not the same as the user in updatable notifications!` }
    }
    return
  }

  await Promise.all(notifs.map((notif) => notificationsContainer.item(notif.id, notif.id).replace({ ...notif, isSent: true })))

  context.res = {
    body: { updatedCount: notifs.length }
  }
}

export default httpTrigger
