import { Spinner, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { RLayout } from '../../components/commons/RLayout'
import { feedFunctions } from './api/FeedModule'

export const IndexPage: FC = () => {
  const { isLoading, isError, data, error } = useQuery('posts', feedFunctions.fetchPosts)

  let content: JSX.Element
  if (isLoading) {
    content = <Spinner />
  }
  if (isError) {
    content = <Text>{`Error occured: ${error}`}</Text>
  }
  content = <Text>{data}</Text>

  return <RLayout>{content}</RLayout>
}
