import { SqlQuerySpec } from '@azure/cosmos'

export const createQueryByUriName = (uriName: string) => ({
  query: 'SELECT * FROM Channels c WHERE UPPER(c.uriName) = UPPER(@uriName)',
  parameters: [
    {
      name: '@uriName',
      value: uriName
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

export const createQueryByOwnerUsername = (username: string): SqlQuerySpec => ({
  query: 'SELECT * FROM Channels c JOIN Users u ON c.owner = u.id WHERE UPPER(c.owner) = UPPER(@username)',
  parameters: [
    {
      name: '@username',
      value: username
    }
  ]
})
