import { Alert, AlertDescription, AlertIcon, AlertTitle, Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { RLayout } from '../../components/commons/RLayout'

type ErrorPageState = {
  title?: string
  messages?: string[]
}

export const ErrorPage: FC = () => {
  const { state } = useLocation()
  const { title, messages } = (state as ErrorPageState) || {}

  return (
    <RLayout>
      <Alert p={10} status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={3} fontSize="2xl">
          {title || 'Error occured'}
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          <VStack justifyContent="center" spacing={1}>
            {messages?.map((errorMsg) => (
              <Text key={errorMsg}>{errorMsg}</Text>
            ))}
            <Text>See console for more information</Text>
          </VStack>
        </AlertDescription>
      </Alert>
    </RLayout>
  )
}
