import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { CreateNotificationView, NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { validateInput } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (!req.body) {
    context.res = {
      status: 400,
      body: { message: `No body attached to POST query.` }
    }
    return
  }

  const inputNotification = req.body as CreateNotificationView
  const { messageBody, messageTitle, userId } = inputNotification
  const isValid = validateInput(inputNotification)
  if (!isValid) {
    context.res = {
      status: 400,
      body: { message: `Request body field(s) failed validation.` }
    }
    return
  }

  const database = fetchCosmosDatabase()
  const notificationsContainer = fetchCosmosContainer(database, 'Notifications')
  const { resource: notification } = await notificationsContainer.items.create<NotificationModel>({
    createdAt: +new Date(),
    messageBody,
    messageTitle,
    userId,
    isSent: false
  })

  context.res = {
    body: notification
  }
}

export default httpTrigger
