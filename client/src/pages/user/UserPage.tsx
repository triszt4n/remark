import { VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { userModule } from '../../api/modules/user.module'
import { RLayout } from '../../components/commons/RLayout'
import { ProfileDetails } from './components/ProfileDetails'

export const UserPage: FC = () => {
  const { username } = useParams()
  const { loggedInUser } = useAuthContext()
  const { isLoading, data: fetchedUser, error } = useQuery(['user', username], () => userModule.fetchUserByUsername(username!!))

  if (username?.toLowerCase() === loggedInUser?.username.toLowerCase()) {
    return <Navigate to="/profile" replace />
  }

  return (
    <RLayout>
      <VStack alignItems="flex-start">
        <ProfileDetails user={fetchedUser} isLoading={isLoading} error={error} />
      </VStack>
    </RLayout>
  )
}
