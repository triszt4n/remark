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

export const createQueryCommentVotesByCommentId = (commentId: string): SqlQuerySpec => ({
  query: 'SELECT * FROM CommentVotes cv WHERE cv.commentId = @commentId',
  parameters: [
    {
      name: '@commentId',
      value: commentId
    }
  ]
})

export const createQueryCommentVotesByCommentAndUser = (commentId: string, userId: string): SqlQuerySpec => ({
  query: 'SELECT * FROM CommentVotes cv WHERE cv.commentId = @commentId AND cv.userId = @userId',
  parameters: [
    {
      name: '@commentId',
      value: commentId
    },
    {
      name: '@userId',
      value: userId
    }
  ]
})
