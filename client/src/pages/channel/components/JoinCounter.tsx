import { Box, Button, HStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { toReadableNumber } from '../../../util/core-util-functions'

export const JoinCounter: FC = () => {
  const { isLoggedIn } = useAuthContext()
  const onJoinPressed = () => {}

  return (
    <HStack ml="auto">
      <Box>{toReadableNumber(18000000)} joined</Box>
      {isLoggedIn && (
        <Button size="sm" colorScheme="theme" onClick={onJoinPressed}>
          Join
        </Button>
      )}
    </HStack>
  )
}
