import { useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { userModule } from '../../api/modules/user.module'
import { RLayout } from '../../components/commons/RLayout'
import { EditUsernameModal } from './components/EditUsernameModal'
import { ProfileDetails } from './components/ProfileDetails'
import { ProfileDetailsLoading } from './components/ProfileDetailsLoading'

export const ProfilePage: FC = () => {
  const { isLoggedIn, loggedInUser, loggedInUserError, loggedInUserLoading, onLogout, refetchUser } = useAuthContext()
  const { isOpen, onOpen: onUsernameEditPressed, onClose } = useDisclosure()

  const onSuccessfulSave = async () => {
    refetchUser()
    onClose()
  }

  const onTryUsernameChange = async (newUsername: string): Promise<string> => {
    if (!loggedInUser) return 'There is no user set in!'
    let answer: string = ''
    await userModule
      .updateUser(loggedInUser.id, { username: newUsername })
      .then(() => {
        answer = ''
      })
      .catch((error) => {
        console.log('[ERROR] at onTryUsernameChange', error)
        answer = error.response.data.message
      })
    return answer
  }

  if (loggedInUserError) {
    console.log('[DEBUG] Error at ProfilePage', loggedInUserError)
    return <Navigate to="/error" state={{ title: 'You are not logged in yet!', messages: [(loggedInUserError as any)?.message] }} />
  }

  if (!isLoggedIn) {
    return <Navigate to="/error" state={{ title: 'You are not logged in yet!', messages: [] }} />
  }

  return (
    <RLayout>
      {loggedInUserLoading ? (
        <ProfileDetailsLoading />
      ) : (
        <ProfileDetails
          user={loggedInUser!!}
          profileOptions={{ onLogoutPressed: onLogout, onUsernameEditPressed: onUsernameEditPressed }}
        />
      )}
      {loggedInUser && (
        <EditUsernameModal
          isOpen={isOpen}
          onClose={onSuccessfulSave}
          onSave={onTryUsernameChange}
          currentUsername={loggedInUser.username}
        />
      )}
    </RLayout>
  )
}
