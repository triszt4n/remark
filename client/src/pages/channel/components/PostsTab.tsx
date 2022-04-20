import { Center, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { channelModule } from '../../../api/modules/channel.module'
import { PostPreview } from './post/PostPreview'
import { PostPreviewLoading } from './post/PostPreviewLoading'

export const PostsTab: FC<{ uriName: string }> = ({ uriName }) => {
  const { isLoading, data: posts, error } = useQuery(['channelPosts', uriName], () => channelModule.fetchPostsOfChannel(uriName))

  if (isLoading) {
    return (
      <>
        {[...Array(5)].map(() => (
          <PostPreviewLoading />
        ))}
      </>
    )
  }

  if (error) {
    console.log('[DEBUG] at ChannelPage: PostsTab', error)
    return <Center fontSize="lg">Error when fetching channel's posts!</Center>
  }

  return (
    <VStack spacing={6} align="stretch">
      {posts?.map((post) => (
        <PostPreview post={post} />
      ))}
    </VStack>
  )
}
