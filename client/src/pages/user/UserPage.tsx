import { VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { userModule } from '../../api/modules/user.module'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'
import { RLayout } from '../../components/commons/RLayout'
import { ProfileDetails } from './components/ProfileDetails'

export const UserPage: FC = () => {
  const { username } = useParams()
  const { loggedInUser } = useAuthContext()
  const { isLoading, data: fetchedUser, error } = useQuery(['user', username], () => userModule.fetchUserByUsername(username!!))

  if (username?.toLowerCase() === loggedInUser?.username.toLowerCase()) {
    return <Navigate to="/profile" replace />
  }

  if (isLoading) {
    return (
      <RLayout>
        <PuzzleAnimated text="Loading user" />
      </RLayout>
    )
  }

  if (!fetchedUser) {
    return <Navigate replace to="/error?messages=No user found under this username!" />
  }

  if (error) {
    console.log('[DEBUG] at ProfilePage: fetchUserByUsername', error)
    return <Navigate replace to="/error?messages=Error when fetching user's profile!" />
  }

  return (
    <RLayout>
      <VStack alignItems="flex-start">
        <ProfileDetails user={fetchedUser} />
      </VStack>
    </RLayout>
  )
}
