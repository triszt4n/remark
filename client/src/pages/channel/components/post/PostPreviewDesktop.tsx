import { Box, Heading, HStack, Image, LinkBox, LinkOverlay, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
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

export const PostPreviewDesktop: FC<Props> = ({ post, onUpvotePressed, onDownvotePressed, targetPath }) => {
  return (
    <HStack spacing={6} alignItems="start">
      <VStack spacing={2}>
        <PostPreviewVoteButtons
          voteCount={post.voteCount}
          myVote={post.myVote}
          onUpvotePressed={onUpvotePressed}
          onDownvotePressed={onDownvotePressed}
        />
      </VStack>
      <LinkBox as={HStack} flex={1} spacing={3} alignItems="start">
        <Box flex={1}>
          <Box fontSize="sm" fontWeight={300}>
            Posted by <RLink to={`/users/${post.publisherUsername}`}>{post.publisherUsername}</RLink>{' '}
            <time dateTime={new Date(post.createdAt * 1000).toISOString()}>{toRelativeDateString(post.createdAt)}</time>
          </Box>
          <Heading size="lg" mb={4}>
            <LinkOverlay as={Link} to={targetPath} href={targetPath}>
              {post.title}
            </LinkOverlay>
          </Heading>
          <PostPreviewDescription rawMarkdown={post.rawMarkdown} />
        </Box>
        <Box>
          {post.imageUrl && (
            <Image
              height={{ md: '8rem', lg: '10rem' }}
              width={{ md: '12rem', lg: '14rem' }}
              borderRadius="md"
              objectFit="cover"
              src={post.imageUrl}
              alt={ellipsifyLongText(post.title, 16)}
            />
          )}
        </Box>
      </LinkBox>
    </HStack>
  )
}
