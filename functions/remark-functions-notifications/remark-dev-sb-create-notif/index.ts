import { AzureFunction, Context } from '@azure/functions'
import { NotificationResource } from '../lib/model'

const serviceBusQueueTrigger: AzureFunction = async function (context: Context, queueItem: NotificationResource): Promise<void> {
  context.bindings.signalRMessages = [
    {
      target: `newNotification`,
      arguments: [queueItem]
    }
  ]
  context.done()
}

export default serviceBusQueueTrigger
