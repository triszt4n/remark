import { Spinner, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { postModule } from '../../../api/modules/post.module'

export const Users: FC = () => {
  const { isLoading, isError, data, error } = useQuery('user', postModule.fetchUser)

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <Text>{`Error occured: ${error}`}</Text>
  }
  return <Text>{data}</Text>
}
