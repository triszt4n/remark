import { Box, HStack, VStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { User } from '../../../api/models/user.model'

type Props = {
  user?: User
}

export const UserDetails: FC<Props> = ({ user }) => {
  if (!user) return <Box fontWeight={700}>User not found</Box>

  return (
    <VStack alignItems="flex-start">
      <HStack>
        <Box fontWeight={700}>Username</Box>
        <Box>{user.username}</Box>
      </HStack>
      <HStack>
        <Box fontWeight={700}>Id</Box>
        <Box>{user.id}</Box>
      </HStack>
      <HStack>
        <Box fontWeight={700}>Name</Box>
        <Box>
          {user.firstName} {user.lastName}
        </Box>
      </HStack>
      <HStack>
        <Box fontWeight={700}>Token</Box>
        <Box>{user.token}</Box>
      </HStack>
    </VStack>
  )
}
