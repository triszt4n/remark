import { Box, HStack, Image, VStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { FaAddressCard, FaAt } from 'react-icons/fa'
import { User } from '../../../api/models/user.model'

type Props = {
  user: User
}

export const ProfileDetails: FC<Props> = ({ user, children }) => {
  return (
    <VStack alignItems="flex-start">
      {user.imageUrl && <Image boxSize="150px" objectFit="cover" src={user.imageUrl} alt={user.username} />}
      <HStack>
        <Box fontSize="4xl" fontWeight={700} wordBreak="break-all">
          u/{user.username}
        </Box>
        {children}
      </HStack>
      <HStack>
        <FaAddressCard />
        <Box>
          {user.firstName} {user.lastName}
        </Box>
      </HStack>
      <HStack>
        <FaAt />
        <Box>{user.email}</Box>
      </HStack>
    </VStack>
  )
}
