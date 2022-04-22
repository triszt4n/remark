import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { FaBolt } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { RLayout } from '../../components/commons/RLayout'

export const ErrorPage: FC = () => {
  const { state } = useLocation()
  const { title, messages } = state as { title?: string; messages?: string[] }

  return (
    <RLayout>
      <HStack justifyContent="center">
        <FaBolt size={64} />
        <Heading mb={10}>{title || 'Error occured'}</Heading>
        <FaBolt size={64} />
      </HStack>
      <VStack justifyContent="center">
        {messages?.map((errorMsg) => (
          <Text key={errorMsg} fontSize="lg">
            {errorMsg}
          </Text>
        ))}
      </VStack>
    </RLayout>
  )
}
