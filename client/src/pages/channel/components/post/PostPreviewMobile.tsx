import { Box, Heading, HStack, Image, Link, LinkBox, LinkOverlay, Spacer } from '@chakra-ui/react'
import { FC } from 'react'
import { Post } from '../../../../api/models/post.model'
import { RLink } from '../../../../components/commons/RLink'
import { ellipsifyLongText, toRelativeDateString } from '../../../../util/core-util-functions'
import { PostPreviewDescription } from './parts/PostPreviewDescription'
import { PostPreviewVoteButtons } from './parts/PostPreviewVoteButtons'

type Props = {
  targetPath: string
  post: Post
  onUpvotePressed: () => void
  onDownvotePressed: () => void
}

export const PostPreviewMobile: FC<Props> = ({ post, onUpvotePressed, onDownvotePressed, targetPath }) => {
  return (
    <Box>
      <LinkBox as={HStack} mb={4}>
        <Box flex={1}>
          <Heading size="md" mb={2}>
            <LinkOverlay as={Link} to={targetPath} href={targetPath}>
              {post.title}
            </LinkOverlay>
          </Heading>
          <PostPreviewDescription rawMarkdown={post.rawMarkdown} />
        </Box>
        {post.imageUrl && (
          <Image
            height="4rem"
            width="6rem"
            borderRadius="md"
            objectFit="cover"
            src={post.imageUrl}
            alt={ellipsifyLongText(post.title, 16)}
          />
        )}
      </LinkBox>
      <HStack spacing={2}>
        <PostPreviewVoteButtons
          voteCount={post.voteCount}
          onUpvotePressed={onUpvotePressed}
          onDownvotePressed={onDownvotePressed}
          myVote={post.myVote}
        />
        <Spacer />
        <Box fontSize="xs" textAlign="end">
          <Box>
            Posted by <RLink to={`/users/${post.publisherUsername}`}>{ellipsifyLongText(post.publisherUsername, 24)}</RLink>
          </Box>
          <Box>
            <time dateTime={new Date(post.createdAt * 1000).toISOString()}>{toRelativeDateString(post.createdAt)}</time>
          </Box>
        </Box>
      </HStack>
    </Box>
  )
}
