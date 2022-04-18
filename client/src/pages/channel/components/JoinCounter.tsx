import { Box, Button, HStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'

const toReadableNumber = (num: number): string =>
  Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num)

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
