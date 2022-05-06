import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus'

export const fetchServiceBus = (): { serviceBusClient: ServiceBusClient; serviceBusSender: ServiceBusSender } => {
  const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING
  const queueName = process.env.SERVICE_BUS_QUEUE_NAME
  if (!connectionString || !queueName) {
    throw new Error('Environment variables missing')
  }
  const serviceBusClient = new ServiceBusClient(connectionString)
  const serviceBusSender = serviceBusClient.createSender(queueName)
  return { serviceBusClient, serviceBusSender }
}
