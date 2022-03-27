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
  const { isLoggedIn, onLogout } = useAuthContext()
  const { isLoading, data: user, error } = useQuery(['user', username], () => userModule.fetchUserByUsername(username!!))

  if (isLoading || !user) {
    return (
      <RLayout>
        <PuzzleAnimated text="Loading user" />
      </RLayout>
    )
  }

  if (error) {
    console.log('[DEBUG] at ProfilePage: fetchUserByUsername', error)
    return <Navigate replace to="/error?messages=Error when fetching user's profile!" />
  }

  return (
    <RLayout>
      <VStack alignItems="flex-start">
        <ProfileDetails user={user} />
      </VStack>
    </RLayout>
  )
}
