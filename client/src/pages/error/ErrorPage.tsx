import { Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { RLayout } from '../../components/commons/RLayout'

export const ErrorPage: FC = () => {
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const errorMsgs = queryParams.get('messages')?.split(',')

  return (
    <RLayout>
      <Heading mb={10}>Error occured!</Heading>
      <UnorderedList>
        {errorMsgs?.map((errorMsg) => (
          <ListItem>
            <Text>{errorMsg}</Text>
          </ListItem>
        ))}
      </UnorderedList>
    </RLayout>
  )
}
