import { AzureFunction, Context } from '@azure/functions'
import { NotificationResource } from '../lib/model'

const serviceBusQueueTrigger: AzureFunction = async function (context: Context, queueItem: NotificationResource): Promise<void> {
  context.log('[DEBUG] ServiceBus queue trigger function processed message:', queueItem)
  context.bindings.signalRMessages = [
    {
      target: `notif:${queueItem.userId}`,
      arguments: [queueItem]
    }
  ]
  context.done()
}

export default serviceBusQueueTrigger
