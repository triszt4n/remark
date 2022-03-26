import { Box, Button, Heading, HStack, Image, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { userModule } from '../../api/modules/user.module'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'
import { RLayout } from '../../components/commons/RLayout'

export const ProfilePage: FC = () => {
  const { isLoggedIn, onLogout } = useAuthContext()
  const { isLoading, data: user, error } = useQuery('currentUser', userModule.fetchCurrentUser)

  if (!isLoggedIn) {
    return <Navigate replace to="/error?messages=You are not logged in yet!" />
  }

  if (isLoading || !user) {
    return (
      <RLayout>
        <PuzzleAnimated text="Loading user" />
      </RLayout>
    )
  }

  if (error) {
    console.log('[DEBUG] at ProfilePage: fetchCurrentUser', error)
    return <Navigate replace to="/error?messages=Error when fetching current user's profile!" />
  }

  return (
    <RLayout>
      <VStack alignItems="flex-start">
        {user.imageUrl && <Image boxSize="150px" objectFit="cover" src={user.imageUrl} alt={user.username} />}
        <Heading>{user.username}</Heading>
        <Button onClick={onLogout} disabled={!user} leftIcon={<FaSignOutAlt />} colorScheme="themeHelper">
          Log out
        </Button>
        <HStack>
          <Box fontWeight={700}>Name</Box>
          <Box>
            {user.firstName} {user.lastName}
          </Box>
        </HStack>
        <HStack>
          <Box fontWeight={700}>Email</Box>
          <Box>{user.email}</Box>
        </HStack>
      </VStack>
    </RLayout>
  )
}
