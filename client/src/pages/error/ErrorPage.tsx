import { Heading, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { RLayout } from '../../components/commons/RLayout'

export const ErrorPage: FC = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const errorMsgs = queryParams
    .get('messages')
    ?.split(',')
    .map((msg) => msg.replace("'", '').trim())

  return (
    <RLayout>
      <Heading mb={10}>Error occured!</Heading>
      {errorMsgs?.map((errorMsg) => (
        <Text fontSize="lg">{errorMsg}</Text>
      ))}
    </RLayout>
  )
}
