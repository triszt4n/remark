import { useBreakpointValue, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { Post } from '../../../api/models/post.model'
import { PostDetailsDesktop } from './PostDetailsDesktop'
import { PostDetailsMobile } from './PostDetailsMobile'

type Props = {
  post: Post
}

export const PostDetails: FC<Props> = ({ post }) => {
  const onUpvotePressed = () => {}
  const onDownvotePressed = () => {}

  return (
    <VStack spacing={{ base: 4, md: 10 }} align="stretch">
      {useBreakpointValue({
        base: <PostDetailsMobile post={post} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} />,
        md: <PostDetailsDesktop post={post} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} />
      })}
    </VStack>
  )
}
