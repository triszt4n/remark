import { Box, IconButton } from '@chakra-ui/react'
import React, { FC } from 'react'
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'
import { toReadableNumber } from '../../../../../util/core-util-functions'

type Props = {
  voteCount: number
  onUpvotePressed: () => void
  onDownvotePressed: () => void
  myVote: 'up' | 'down' | 'none'
}

export const PostPreviewVoteButtons: FC<Props> = ({ voteCount, onUpvotePressed, onDownvotePressed, myVote }) => {
  return (
    <>
      <IconButton
        size="sm"
        aria-label="Upvote post"
        icon={<FaRegThumbsUp />}
        variant={myVote === 'up' ? 'solid' : 'outline'}
        colorScheme="primary"
        onClick={onUpvotePressed}
      />
      <Box fontSize="sm" fontWeight={700}>
        {toReadableNumber(voteCount)}
      </Box>
      <IconButton
        size="sm"
        aria-label="Downvote post"
        icon={<FaRegThumbsDown />}
        variant={myVote === 'down' ? 'solid' : 'outline'}
        colorScheme="secondary"
        onClick={onDownvotePressed}
      />
    </>
  )
}
