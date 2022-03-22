import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { GoogleLogout } from 'react-google-login'
import { FcGoogle } from 'react-icons/fc'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { RLayout } from '../../components/commons/RLayout'
import { GOOGLE_AUTH_CLIENT_ID } from '../../util/environment'
import { UserDetails } from './components/UserDetails'

export const ProfilePage: FC = () => {
  const { isLoggedIn, user, onLogoutSuccess } = useAuthContext()

  if (!isLoggedIn) return <Navigate replace to="/error?messages=You are not logged in yet!" />

  return (
    <RLayout>
      <VStack alignItems="flex-start">
        <UserDetails user={user} />
        <GoogleLogout
          clientId={GOOGLE_AUTH_CLIENT_ID}
          buttonText="Log out"
          render={(renderProps) => (
            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <HStack>
                <FcGoogle size="1.75rem" />
                <Text>Log out</Text>
              </HStack>
            </Button>
          )}
          onLogoutSuccess={onLogoutSuccess}
        />
      </VStack>
    </RLayout>
  )
}
