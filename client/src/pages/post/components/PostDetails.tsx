import { useBreakpointValue } from '@chakra-ui/react'
import { FC } from 'react'
import { Post } from '../../../api/models/post.model'
import { PostDetailsDesktop } from './PostDetailsDesktop'
import { PostDetailsMobile } from './PostDetailsMobile'

type Props = {
  post: Post | undefined
  isLoading: boolean
}

export const PostDetails: FC<Props> = ({ post, isLoading }) => {
  const onUpvotePressed = () => {}
  const onDownvotePressed = () => {}

  if (isLoading || !post) {
    return (
      <>
        {useBreakpointValue({
          base: <></>,
          md: <></>
        })}
      </>
    )
  }

  return (
    <>
      {useBreakpointValue({
        base: <PostDetailsMobile post={post} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} />,
        md: <PostDetailsDesktop post={post} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} />
      })}
    </>
  )
}
