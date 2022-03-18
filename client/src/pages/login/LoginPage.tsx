import { Button, HStack, Text, useToast, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { FcGoogle } from 'react-icons/fc'
import { RLayout } from '../../components/commons/RLayout'
import { GOOGLE_AUTH_CLIENT_ID } from '../../util/environment'

export const LoginPage: FC = () => {
  const toast = useToast()

  const onAuthSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response)
  }
  const onAuthFailure = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    toast({
      title: 'Authentication error',
      description: 'There was an error while authenticating you at Google!',
      status: 'error',
      duration: 5000,
      isClosable: true
    })
  }

  return (
    <RLayout>
      <VStack alignItems="center" spacing={6}>
        <Text fontSize="xl" fontWeight={700}>
          Log in or register to re:mark using your Google account
        </Text>
        <GoogleLogin
          clientId={GOOGLE_AUTH_CLIENT_ID}
          buttonText="Log in with Google"
          render={(renderProps) => (
            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
              <HStack>
                <FcGoogle size="1.75rem" />
                <Text>Log in with Google</Text>
              </HStack>
            </Button>
          )}
          onSuccess={onAuthSuccess}
          onFailure={onAuthFailure}
          cookiePolicy={'single_host_origin'}
        />
      </VStack>
    </RLayout>
  )
}
