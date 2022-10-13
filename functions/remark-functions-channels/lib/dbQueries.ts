export const createQueryForPostCountOfChannel = (id: string) => ({
  query: 'SELECT COUNT(p.id) AS postsCount FROM Posts p WHERE p.parentChannelId = @id',
  parameters: [
    {
      name: '@id',
      value: id
    }
  ]
})

export const createQueryForJoinCountOfChannel = (id: string) => ({
  query: 'SELECT COUNT(cj.id) AS joinCount FROM ChannelJoins cj WHERE cj.channelId = @id',
  parameters: [
    {
      name: '@id',
      value: id
    }
  ]
})

export const createQueryChannelJoinOfUserIdAndChannelId = (userId: string, channelId: string) => ({
  query: 'SELECT * FROM ChannelJoins cj WHERE cj.userId = @userId AND cj.channelId = @channelId',
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

export const createQueryOwnerChannelJoinOfChannelId = (channelId: string) => ({
  query: 'SELECT * FROM ChannelJoins cj WHERE cj.channelId = @channelId AND cj.isOwner = true',
  parameters: [
    {
      name: '@channelId',
      value: channelId
    }
  ]
})

export const createQueryChannelJoinsOfUserId = (userId: string) => ({
  query: 'SELECT * FROM ChannelJoins cj WHERE cj.userId = @userId',
  parameters: [
    {
      name: '@userId',
      value: userId
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

export const createQueryByUriName = (uriName: string) => ({
  query: 'SELECT c.id FROM Channels c WHERE UPPER(c.uriName) = UPPER(@uriName)',
  parameters: [
    {
      name: '@uriName',
      value: uriName
    }
  ]
})

export const createQueryByModeratorIds = (moderatorIds: string[]) => ({
  query: 'SELECT * FROM Users u WHERE ARRAY_CONTAINS(@moderatorIds, u.id)',
  parameters: [
    {
      name: '@moderatorIds',
      value: moderatorIds
    }
  ]
})

// select for ChannelPartial
export const createQueryByChannelIds = (channelIds: string[]) => ({
  query: 'SELECT c.id, c.uriName, c.title FROM Channels c WHERE ARRAY_CONTAINS(@channelIds, c.id)',
  parameters: [
    {
      name: '@channelIds',
      value: channelIds
    }
  ]
})

export const createQueryPostsOfChannel = (channelId: string) => ({
  query: 'SELECT * FROM Posts p WHERE p.parentChannelId = @channelId',
  parameters: [
    {
      name: '@channelId',
      value: channelId
    }
  ]
})

export const createQueryChannelJoinsOfChannel = (channelId: string) => ({
  query: 'SELECT * FROM ChannelJoins cj WHERE cj.channelId = @channelId',
  parameters: [
    {
      name: '@channelId',
      value: channelId
    }
  ]
})

export const createQueryUserByUsername = (username: string) => ({
  query: 'SELECT * FROM Users u WHERE u.username = @username',
  parameters: [
    {
      name: '@username',
      value: username
    }
  ]
})
