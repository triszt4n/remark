import { SqlQuerySpec } from '@azure/cosmos'

export const createQueryChannelJoinByUserIdAndChannelId = (userId: string, channelId: string): SqlQuerySpec => ({
  query: 'SELECT cj.id FROM ChannelJoins cj WHERE cj.userId = @userId AND cj.channelId = @channelId',
  parameters: [
    {
      name: '@userId',
      value: userId
    },
    {
      name: '@channelId',
      value: channelId
    }
  ]
})
