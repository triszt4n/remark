import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export const fetchSignalrConnection = (): HubConnection => {
  return new HubConnectionBuilder()
    .withUrl('http://localhost:7071/api')
    .configureLogging(process.env.NODE_ENV == 'production' ? LogLevel.Information : LogLevel.Debug)
    .build()
}
