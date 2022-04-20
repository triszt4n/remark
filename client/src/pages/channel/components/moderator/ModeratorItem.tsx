import { Avatar, Box, HStack } from '@chakra-ui/react'
import { FC } from 'react'
import { User } from '../../../../api/models/user.model'
import { RLink } from '../../../../components/commons/RLink'

type Props = {
  user: User
  subtitle?: string
}

export const ModeratorItem: FC<Props> = ({ user, subtitle }) => {
  return (
    <Box p={2}>
      <HStack spacing={4}>
        <Avatar name={`${user.firstName} ${user.lastName}`} src={user.imageUrl} />
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
    </Box>
  )
}
