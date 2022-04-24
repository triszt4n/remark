import { Box, useBreakpointValue } from '@chakra-ui/react'
import { PostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { PostPreviewDesktop } from './PostPreviewDesktop'
import { PostPreviewMobile } from './PostPreviewMobile'

export type PostPreviewProps = {
  post: PostView
  onUpvotePressed?: () => void
  onDownvotePressed?: () => void
}

export const PostPreview: FC<PostPreviewProps> = ({ post, onUpvotePressed = () => {}, onDownvotePressed = () => {} }) => {
  const targetPath = `/channels/${post.channel.id}/posts/${post.id}`

  return (
    <Box as="article" p={4} borderRadius="md" borderWidth="1px">
      {useBreakpointValue({
        base: (
          <PostPreviewMobile post={post} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} targetPath={targetPath} />
        ),
        md: (
          <PostPreviewDesktop post={post} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} targetPath={targetPath} />
        )
      })}
    </Box>
  )
}
