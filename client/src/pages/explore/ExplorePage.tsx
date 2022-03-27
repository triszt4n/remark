import { Box, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import { userModule } from '../../api/modules/user.module'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'
import { RLayout } from '../../components/commons/RLayout'
import { RLink } from '../../components/commons/RLink'

export const ExplorePage: FC = () => {
  const { isLoading, data: users, error } = useQuery('users', userModule.fetchUsers)

  if (isLoading || !users) {
    return (
      <RLayout>
        <PuzzleAnimated text="Loading users" />
      </RLayout>
    )
  }

  if (error) {
    console.log('[DEBUG] at ProfilePage: fetchUserByUsername', error)
    return <Navigate replace to="/error?messages=Error when fetching user's profile!" />
  }

  return (
    <RLayout>
      <VStack spacing={6} alignItems="flex-start">
        {users.map(({ username, firstName, lastName, email }) => (
          <VStack key={username} alignItems="flex-start">
            <Box>
              username: <RLink to={`/u/${username}`}>{username}</RLink>
            </Box>
            <Box>email: {email}</Box>
            <Box>
              fullname: {firstName} {lastName}
            </Box>
          </VStack>
        ))}
      </VStack>
    </RLayout>
  )
}
