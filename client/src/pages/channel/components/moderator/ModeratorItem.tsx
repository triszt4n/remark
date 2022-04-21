import { Avatar, Box, HStack, useBreakpointValue } from '@chakra-ui/react'
import { FC } from 'react'
import { User } from '../../../../api/models/user.model'
import { RLink } from '../../../../components/commons/RLink'

type Props = {
  user: User
  subtitle?: string
}

export const ModeratorItem: FC<Props> = ({ user, subtitle }) => {
  return (
    <HStack spacing={4} p={2}>
      <Avatar name={`${user.firstName} ${user.lastName}`} src={user.imageUrl} size={useBreakpointValue({ base: 'sm', md: 'md' })} />
      <Box fontWeight={700} fontSize="lg">
        <RLink to={`/users/${user.username}`} wordBreak="break-all">
          {user.username}
        </RLink>
        {subtitle && (
          <Box fontWeight={400} fontSize="xs">
            {subtitle}
          </Box>
        )}
      </Box>
    </HStack>
  )
}
