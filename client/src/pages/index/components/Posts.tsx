import { Spinner, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { postModule } from '../../../api/modules/post.module'

export const Posts: FC = () => {
  const { isLoading, isError, data, error } = useQuery('posts', postModule.fetchPosts)

  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <Text>{`Error occured: ${error}`}</Text>
  }
  return <Text>{data}</Text>
}
