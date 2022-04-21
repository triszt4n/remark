import { Box, Button, Center, Flex, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { channelModule } from '../../../api/modules/channel.module'
import { PostPreview } from './post/PostPreview'
import { PostPreviewLoading } from './post/PostPreviewLoading'

export const PostsTab: FC<{ uriName: string }> = ({ uriName }) => {
  const { isLoading, data: posts, error } = useQuery(['channelPosts', uriName], () => channelModule.fetchPostsOfChannel(uriName))
  const { isLoggedIn } = useAuthContext()
  const onCreatePostPressed = () => {}

  if (isLoading) {
    return (
      <VStack spacing={6} align="stretch">
        {[...Array(5)].map((_, index) => (
          <PostPreviewLoading key={index} hasImage={index % 3 == 1} />
        ))}
      </VStack>
    )
  }

  if (error) {
    console.log('[DEBUG] at ChannelPage: PostsTab', error)
    return (
      <Box width="full">
        <Center fontSize="lg">Error when fetching channel's posts! {(error as any).response.statusText}</Center>
      </Box>
    )
  }

  return (
    <>
      {isLoggedIn && (
        <Flex justifyContent="end" mb={3}>
          <Button size="sm" leftIcon={<FaPlus />} colorScheme="theme" variant="outline" onClick={onCreatePostPressed}>
            Post here
          </Button>
        </Flex>
      )}
      <VStack spacing={6} align="stretch">
        {posts?.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </VStack>
    </>
  )
}
