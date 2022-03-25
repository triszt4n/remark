import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, ToastId, useToast, UseToastOptions } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { createContext, FC, useEffect, useRef, useState } from 'react'
import { CookieKeys } from '../CookieKeys'

export type CookieConsentContextType = {
  isAccepted: boolean
}

export const CookieConsentContext = createContext<CookieConsentContextType>({
  isAccepted: false
})

export const CookieConsentProvider: FC = ({ children }) => {
  const toast = useToast()
  const toastIdRef = useRef<ToastId>()
  const [isAccepted, setIsAccepted] = useState<boolean>(Cookies.get(CookieKeys.REMARK_COOKIE_CONSENTED) === 'true')

  const toastOptions: UseToastOptions = {
    containerStyle: {
      width: '100%',
      maxWidth: '100%'
    },
    render: () => (
      <Box maxWidth="80rem" mx="auto" p={2}>
        <Alert colorScheme="themeHelper" variant="solid" borderRadius={6} width="full">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Please accept our cookies</AlertTitle>
            <AlertDescription display="block">
              We're using cookies on this site for your comfort. By using the site, you consent to us using cookies.
            </AlertDescription>
          </Box>
          <Button variant="outline" onClick={() => setIsAccepted(true)} ml={2}>
            I understand
          </Button>
        </Alert>
      </Box>
    ),
    duration: null,
    isClosable: true
  }

  useEffect(() => {
    Cookies.set(CookieKeys.REMARK_COOKIE_CONSENTED, isAccepted ? 'true' : 'false')
    if (isAccepted && toastIdRef.current) {
      toast.close(toastIdRef.current)
    }
  }, [isAccepted])

  useEffect(() => {
    if (!isAccepted) {
      toastIdRef.current = toast(toastOptions)
    }
  }, [])

  return <CookieConsentContext.Provider value={{ isAccepted }}>{children}</CookieConsentContext.Provider>
}
