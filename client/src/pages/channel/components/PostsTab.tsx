import { Box, Button, Center, Flex, VStack } from '@chakra-ui/react'
import { ChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FaComments } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { channelModule } from '../../../api/modules/channel.module'
import { PostPreview } from './post/PostPreview'
import { PostPreviewLoading } from './post/PostPreviewLoading'

type Props = { channel: ChannelView | undefined; channelId: string }

export const PostsTab: FC<Props> = ({ channel, channelId }) => {
  const { isLoading, data: posts, error } = useQuery(['channelPosts', channelId], () => channelModule.fetchPostsOfChannel(channelId))
  const { isLoggedIn } = useAuthContext()
  const navigate = useNavigate()
  const onCreatePostPressed = () => {
    navigate(`/posts/new/${channel?.id}`, { state: { channel } })
  }

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
        <Center fontSize="lg">Error when fetching channel's posts! {(error as any)?.response.data.message}</Center>
      </Box>
    )
  }

  return (
    <>
      {isLoggedIn && channel && channel.amIJoined && (
        <Flex justifyContent="end" mb={3}>
          <Button leftIcon={<FaComments />} colorScheme="themeHelper" onClick={onCreatePostPressed}>
            Publish post
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
