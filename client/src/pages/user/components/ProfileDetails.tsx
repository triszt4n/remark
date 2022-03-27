import { Box, HStack, Image, VStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { User } from '../../../api/models/user.model'

type Props = {
  user: User
}

export const ProfileDetails: FC<Props> = ({ user, children }) => {
  return (
    <VStack alignItems="flex-start">
      {user.imageUrl && <Image boxSize="150px" objectFit="cover" src={user.imageUrl} alt={user.username} />}
      <HStack>
        <Box fontSize="4xl" fontWeight={700}>
          u/{user.username}
        </Box>
        {children}
      </HStack>
      <HStack>
        <Box fontWeight={700}>Full name</Box>
        <Box>
          {user.firstName} {user.lastName}
        </Box>
      </HStack>
      <HStack>
        <Box fontWeight={700}>Email address</Box>
        <Box>{user.email}</Box>
      </HStack>
    </VStack>
  )
}
