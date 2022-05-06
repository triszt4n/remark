import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { ServiceBusMessage } from '@azure/service-bus'
import { CreateNotificationView, NotificationModel } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { validateInput } from '../lib/model'
import { fetchServiceBus } from '../lib/serviceBusConfig'

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

  // Send it to Service Bus
  const notifMessage: ServiceBusMessage = {
    body: notification
  }
  const { serviceBusClient, serviceBusSender } = fetchServiceBus()

  try {
    await serviceBusSender.sendMessages(notifMessage)
    await serviceBusSender.close()
  } finally {
    await serviceBusClient.close()
  }
}

export default httpTrigger
