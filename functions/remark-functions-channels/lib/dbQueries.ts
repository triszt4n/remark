export const createQueryForPostCountOfChannel = (id: string) => ({
  query: 'SELECT COUNT(*) FROM Posts p WHERE p.parentChannelId = @id',
  parameters: [
    {
      name: '@id',
      value: id
    }
  ]
})

export const createQueryForJoinCountOfChannel = (id: string) => ({
  query: 'SELECT COUNT(*) FROM ChannelJoins cj WHERE cj.channelId = @id',
  parameters: [
    {
      name: '@id',
      value: id
    }
  ]
})

export const createQueryChannelJoinOfUserIdAndChannelId = (userId: string, channelId: string) => ({
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

export const createModInfoQueryByUriName = (uriName: string) => ({
  query: 'SELECT c.ownerId, c.moderatorIds FROM Channels c WHERE UPPER(c.uriName) = UPPER(@uriName)',
  parameters: [
    {
      name: '@uriName',
      value: uriName
    }
  ]
})
