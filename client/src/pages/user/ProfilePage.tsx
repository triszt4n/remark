import { useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { userModule } from '../../api/modules/user.module'
import { RLayout } from '../../components/commons/RLayout'
import { EditUsernameModal } from './components/EditUsernameModal'
import { ProfileDetails } from './components/ProfileDetails'

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

  if (!isLoggedIn) {
    return <Navigate replace to="/error?messages=You are not logged in yet!" />
  }

  return (
    <RLayout>
      <ProfileDetails
        user={loggedInUser}
        isLoading={loggedInUserLoading}
        error={loggedInUserError}
        profileOptions={{ onLogoutPressed: onLogout, onUsernameEditPressed: onUsernameEditPressed }}
      />
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
