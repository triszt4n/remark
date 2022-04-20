import { Box, Button, HStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { toReadableNumber } from '../../../util/core-util-functions'

type Props = {
  isJoined: boolean
  joinCount: number
}

export const JoinCounter: FC<Props> = ({ isJoined, joinCount }) => {
  const { isLoggedIn } = useAuthContext()
  const onJoinPressed = () => {
    if (isJoined && confirm('Do you really want to leave this channel?')) {
      // todo: leaving logic
    } else if (!isJoined) {
      // todo: joining logic
    }
  }

  return (
    <HStack ml="auto">
      <Box>{toReadableNumber(joinCount)} joined</Box>
      {isLoggedIn && (
        <Button size="md" colorScheme="theme" variant={isJoined ? 'outline' : 'solid'} onClick={onJoinPressed}>
          {isJoined ? 'Leave' : 'Join'}
        </Button>
      )}
    </HStack>
  )
}
