import { Badge, Box, Heading, HStack, Image, LinkBox, LinkOverlay, useBreakpointValue, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { PostPartial } from '../../../../api/models/post.model'
import { ellipsifyLongText, toRelativeDateString } from '../../../../util/core-util-functions'

type Props = {
  post: PostPartial
}

export const CreatedPost: FC<Props> = ({ post }) => {
  return (
    <LinkBox display="inline-block" mx={1} borderWidth="1px" borderRadius="md" p={3} w="20rem">
      <VStack align="stretch">
        <Box fontSize="xs" color="gray.500" fontWeight={700} letterSpacing="wide">
          channels/{ellipsifyLongText(post.parentChannelUriName, 16)} &bull; {toRelativeDateString(post.createdAt)}
        </Box>
        <HStack fontSize="xs">
          <Badge colorScheme={post.voteCount > 0 ? 'secondary' : 'primary'} letterSpacing="wide">
            <HStack>
              {post.voteCount >= 0 ? <FaRegThumbsUp /> : <FaRegThumbsDown />}
              <Box>{post.voteCount}</Box>
            </HStack>
          </Badge>
          <Heading size="sm">
            <LinkOverlay
              as={Link}
              to={`/channels/${post.parentChannelUriName}/posts/${post.id}`}
              href={`/channels/${post.parentChannelUriName}/posts/${post.id}`}
            >
              {ellipsifyLongText(post.title, 26)}
            </LinkOverlay>
          </Heading>
        </HStack>
        <Box fontSize="xs">
          <ReactMarkdown
            allowedElements={[]}
            unwrapDisallowed
            children={ellipsifyLongText(post.rawMarkdown, useBreakpointValue({ base: 45, md: 70, lg: 120 }))}
            skipHtml
          />
        </Box>
        {post.imageUrl && (
          <Box>
            <Image
              borderRadius="md"
              objectFit="cover"
              height={{ md: '12rem', lg: '20rem' }}
              width="100%"
              src={post.imageUrl}
              alt="Post image"
            />
          </Box>
        )}
      </VStack>
    </LinkBox>
  )
}
