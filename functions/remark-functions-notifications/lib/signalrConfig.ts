export const fetchSignalrClient = () => {
  const connectionString = process.env.SIGNALR_CONNECTION_STRING
  if (!connectionString) {
    throw new Error('Environment variable missing!')
  }
}
