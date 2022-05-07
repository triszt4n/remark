import { SqlQuerySpec } from '@azure/cosmos'

export const createQueryPostVotesByPostId = (postId: string): SqlQuerySpec => ({
  query: 'SELECT * FROM PostVotes pv WHERE pv.postId = @postId',
  parameters: [
    {
      name: '@postId',
      value: postId
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

export const createQueryPostVoteByPostIdAndUserId = (postId: string, userId: string): SqlQuerySpec => ({
  query: 'SELECT * FROM PostVotes pv WHERE pv.postId = @postId AND pv.userId = @userId',
  parameters: [
    {
      name: '@postId',
      value: postId
    },
    {
      name: '@userId',
      value: userId
    }
  ]
})

export const createQueryCommentVoteByCommentIdAndUserId = (commentId: string, userId: string): SqlQuerySpec => ({
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

export const createQueryChannelJoinByUserIdAndChannelId = (userId: string, channelId: string): SqlQuerySpec => ({
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

export const createQueryChannelJoinsByChannelId = (channelId: string): SqlQuerySpec => ({
  query: 'SELECT * FROM ChannelJoins cj WHERE cj.channelId = @channelId',
  parameters: [
    {
      name: '@channelId',
      value: channelId
    }
  ]
})

export const createQueryPostsOfChannelId = (parentChannelId: string): SqlQuerySpec => ({
  query: 'SELECT * FROM Posts p WHERE p.parentChannelId = @parentChannelId',
  parameters: [
    {
      name: '@parentChannelId',
      value: parentChannelId
    }
  ]
})

export const createQueryPostsOfUserId = (userId: string): SqlQuerySpec => ({
  query: 'SELECT * FROM Posts p WHERE p.publisherId = @userId',
  parameters: [
    {
      name: '@userId',
      value: userId
    }
  ]
})

export const createQueryCommentsOfPostId = (postId: string): SqlQuerySpec => ({
  query: 'SELECT * FROM Comments c WHERE c.parentPostId = @postId',
  parameters: [
    {
      name: '@postId',
      value: postId
    }
  ]
})
