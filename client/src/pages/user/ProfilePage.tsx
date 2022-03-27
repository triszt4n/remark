import { Button, IconButton, Tooltip, useDisclosure, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { FaEdit, FaSignOutAlt } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { userModule } from '../../api/modules/user.module'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'
import { RLayout } from '../../components/commons/RLayout'
import { queryClient } from '../../util/query-client'
import { EditUsernameModal } from './components/EditUsernameModal'
import { ProfileDetails } from './components/ProfileDetails'

export const ProfilePage: FC = () => {
  const { isLoggedIn, onLogout } = useAuthContext()
  const { isLoading, data: user, error } = useQuery('currentUser', userModule.fetchCurrentUser)
  const { isOpen, onOpen: onUsernameEditPressed, onClose } = useDisclosure()

  const onSuccessfulSave = () => {
    queryClient.invalidateQueries('currentUser')
    onClose()
  }

  const onTryUsernameChange = async (newUsername: string): Promise<string> => {
    if (!user) return 'There is no user set in!'
    let answer: string = ''
    await userModule
      .updateUser(user.id, { username: newUsername })
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
      <VStack alignItems="flex-start" spacing={6}>
        <Button alignSelf="flex-end" onClick={onLogout} disabled={!user} leftIcon={<FaSignOutAlt />} colorScheme="themeHelper">
          Log out
        </Button>
        <ProfileDetails user={user}>
          <Tooltip label="Change username">
            <IconButton
              size="xs"
              alignSelf="flex-start"
              aria-label="Change username"
              onClick={onUsernameEditPressed}
              icon={<FaEdit />}
              colorScheme="themeHelper"
            />
          </Tooltip>
        </ProfileDetails>
      </VStack>
      <EditUsernameModal isOpen={isOpen} onClose={onSuccessfulSave} onSave={onTryUsernameChange} currentUsername={user.username} />
    </RLayout>
  )
}
