export const createQueryForPostCountOfChannel = (id: string) => ({
  query: 'SELECT COUNT(p.id) AS postsCount FROM Posts p WHERE p.parentChannelId = @id',
  parameters: [
    {
      name: '@id',
      value: id
    }
  ]
})
