import { SqlQuerySpec } from '@azure/cosmos'

export const createQueryByOwnerUsername = (username: string): SqlQuerySpec => ({
  query: 'SELECT * FROM Channels c JOIN Users u ON c.owner = u.id WHERE UPPER(c.owner) = UPPER(@username)',
  parameters: [
    {
      name: '@username',
      value: username
    }
  ]
})
