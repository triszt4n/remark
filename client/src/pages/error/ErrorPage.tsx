import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { FaBolt } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { RLayout } from '../../components/commons/RLayout'

export const ErrorPage: FC = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const errorMsgs = queryParams
    .get('messages')
    ?.split(',')
    .map((msg) => msg.trim())

  return (
    <RLayout>
      <HStack justifyContent="center">
        <FaBolt size={64} />
        <Heading mb={10}>Error occured!</Heading>
        <FaBolt size={64} />
      </HStack>
      <VStack justifyContent="center">
        {errorMsgs?.map((errorMsg) => (
          <Text key={errorMsg} fontSize="lg">
            {errorMsg}
          </Text>
        ))}
      </VStack>
    </RLayout>
  )
}
