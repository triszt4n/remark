import { VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { userModule } from '../../api/modules/user.module'
import { ProfileDetailsLoading } from './components/ProfileDetailsLoading'

export const UserProxyPage: FC = () => {
  const { username } = useParams()
  const { loggedInUser } = useAuthContext()

  if (username?.toLowerCase() === loggedInUser?.username.toLowerCase()) {
    return <Navigate replace to="/profile" />
  }

  const { isLoading, data: user, error } = useQuery(['user', username], () => userModule.fetchUserByUsername(username!!))

  if (isLoading) {
    return (
      <VStack alignItems="flex-start">
        <ProfileDetailsLoading />
      </VStack>
    )
  }

  if (error) {
    console.error('[DEBUG] Error at UserProxyPage', error)
    return <Navigate replace to="/error" state={{ title: 'Error occured loading user', messages: [(error as any)?.message] }} />
  }

  return <Navigate replace to={`/users/${user?.id}`} state={{ user: user!! }} />
}
