import { useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { EditUsernameModal } from './components/EditUsernameModal'
import { ProfileDetails } from './components/ProfileDetails'
import { ProfileDetailsLoading } from './components/ProfileDetailsLoading'
import { UploadImageModal } from './components/UploadImageModal'

export const ProfilePage: FC = () => {
  const { isLoggedIn, loggedInUser, loggedInUserError, loggedInUserLoading, onLogout } = useAuthContext()
  const { isOpen: isOpenUsernameEdit, onOpen: onUsernameEditPressed, onClose: onCloseUsernameEdit } = useDisclosure()
  const { isOpen: isOpenProfileImageModal, onOpen: onChangeProfileImagePressed, onClose: onCloseProfileImageModal } = useDisclosure()

  if (loggedInUserError) {
    console.log('[DEBUG] Error at ProfilePage', loggedInUserError)
    return <Navigate replace to="/error" state={{ title: 'You are not logged in yet!', messages: [(loggedInUserError as any)?.message] }} />
  }

  if (!isLoggedIn) {
    return <Navigate replace to="/error" state={{ title: 'You are not logged in yet!', messages: [] }} />
  }

  return (
    <>
      {loggedInUserLoading ? (
        <ProfileDetailsLoading />
      ) : (
        <ProfileDetails
          user={loggedInUser!!}
          profileOptions={{ onLogoutPressed: onLogout, onUsernameEditPressed, onChangeProfileImagePressed }}
        />
      )}
      {loggedInUser && (
        <>
          <EditUsernameModal isOpen={isOpenUsernameEdit} onClose={onCloseUsernameEdit} />
          <UploadImageModal isOpen={isOpenProfileImageModal} onClose={onCloseProfileImageModal} />
        </>
      )}
    </>
  )
}
