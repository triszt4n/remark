import { Badge, Box, Heading, HStack, Image, LinkBox, LinkOverlay, VStack } from '@chakra-ui/react'
import { PostPartialView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { ellipsifyLongText, toRelativeDateString } from '../../../../util/core-util-functions'

type Props = {
  post: PostPartialView
}

export const CreatedPost: FC<Props> = ({ post }) => {
  const { channel, voteCount, createdAt, id, title, imageUrl, rawMarkdown } = post

  return (
    <LinkBox display="inline-block" mx={1} borderWidth="1px" borderRadius="md" p={3} w="20rem">
      <VStack align="stretch">
        <Box fontSize="xs" color="gray.500" fontWeight={700} letterSpacing="wide">
          ch/{ellipsifyLongText(channel.uriName, 24)} &bull; {toRelativeDateString(createdAt)}
        </Box>
        <HStack fontSize="xs">
          <Badge colorScheme={voteCount > 0 ? 'secondary' : 'primary'} letterSpacing="wide">
            <HStack>
              {voteCount >= 0 ? <FaRegThumbsUp /> : <FaRegThumbsDown />}
              <Box>{voteCount}</Box>
            </HStack>
          </Badge>
          <Heading size="sm">
            <LinkOverlay as={Link} to={`/posts/${id}`}>
              {ellipsifyLongText(title, 26)}
            </LinkOverlay>
          </Heading>
        </HStack>
        <Box fontSize="xs" whiteSpace="normal">
          <ReactMarkdown allowedElements={[]} unwrapDisallowed children={ellipsifyLongText(rawMarkdown, 120)} skipHtml />
        </Box>
        {imageUrl && (
          <Box>
            <Image borderRadius="md" objectFit="cover" height={{ md: '12rem', lg: '20rem' }} width="100%" src={imageUrl} alt="Post image" />
          </Box>
        )}
      </VStack>
    </LinkBox>
  )
}
