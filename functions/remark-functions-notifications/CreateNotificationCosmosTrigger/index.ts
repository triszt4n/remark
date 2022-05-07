import { AzureFunction, Context } from '@azure/functions'
import { ServiceBusMessage } from '@azure/service-bus'
import { NotificationResource } from '../lib/model'
import { fetchServiceBus } from '../lib/serviceBusConfig'

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: NotificationResource[]): Promise<void> {
  const messages: ServiceBusMessage[] = documents.map((notification) => ({
    body: notification
  }))
  const { serviceBusClient, serviceBusSender } = fetchServiceBus()

  try {
    await serviceBusSender.sendMessages(messages)
    await serviceBusSender.close()
  } finally {
    await serviceBusClient.close()
  }
}

export default cosmosDBTrigger
