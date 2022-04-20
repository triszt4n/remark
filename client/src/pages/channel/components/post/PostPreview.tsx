import { Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Post } from '../../../../api/models/post.model'
import { RLink } from '../../../../components/commons/RLink'
import { toRelativeDateString } from '../../../../util/core-util-functions'

type Props = {
  post: Post
}

export const PostPreview: FC<Props> = ({ post }) => {
  return (
    <LinkBox as="article" p={4} borderWidth="1px" borderRadius="lg">
      <Box>upvote buttons</Box>
      <Box>
        <Box>
          created by <RLink to={`/users/${post.publisherUsername}`}>{post.publisherUsername}</RLink>
        </Box>
        <Box as="time" dateTime={new Date(post.createdAt * 1000).toISOString()}>
          {toRelativeDateString(post.createdAt)}
        </Box>
        <Heading size="md" my={2}>
          <LinkOverlay href="#">{post.title}</LinkOverlay>
        </Heading>
        <Box mb={3}>
          <ReactMarkdown allowedElements={[]} unwrapDisallowed children={post.rawMarkdown} skipHtml />
        </Box>
      </Box>
    </LinkBox>
  )
}
