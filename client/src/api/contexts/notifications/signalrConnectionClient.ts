import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export const signalrConnection = new HubConnectionBuilder()
  .withUrl('/notifhub')
  .configureLogging(process.env.NODE_ENV == 'production' ? LogLevel.Information : LogLevel.Debug)
  .build()
