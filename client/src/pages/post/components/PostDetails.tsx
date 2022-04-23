import { useBreakpointValue, VStack } from '@chakra-ui/react'
import { PostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { PostDetailsDesktop } from './PostDetailsDesktop'
import { PostDetailsMobile } from './PostDetailsMobile'

type Props = {
  channelId: string
  post: PostView
}

export const PostDetails: FC<Props> = ({ channelId, post }) => {
  const onUpvotePressed = () => {}
  const onDownvotePressed = () => {}

  return (
    <VStack spacing={{ base: 4, md: 10 }} align="stretch">
      {useBreakpointValue({
        base: (
          <PostDetailsMobile post={post} channelId={channelId} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} />
        ),
        md: <PostDetailsDesktop post={post} channelId={channelId} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} />
      })}
    </VStack>
  )
}
