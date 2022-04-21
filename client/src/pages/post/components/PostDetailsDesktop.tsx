import { Avatar, Box, Button, Heading, HStack, Image, Link, Spacer, Tooltip, VStack } from '@chakra-ui/react'
import { PostView } from '@triszt4n/remark-types'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { FC } from 'react'
import { FaExpand } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { RLink } from '../../../components/commons/RLink'
import { VoteButtons } from '../../../components/voting/VoteButtons'
import { toDateTimeString, toRelativeDateString } from '../../../util/core-util-functions'

type Props = {
  post: PostView
  onUpvotePressed: () => void
  onDownvotePressed: () => void
}

export const PostDetailsDesktop: FC<Props> = ({ post, onUpvotePressed, onDownvotePressed }) => {
  const { createdAt, publisher: user, rawMarkdown, parentChannelUriName: uriName, title, voteCount, myVote, imageUrl } = post

  return (
    <>
      <HStack alignItems="start" spacing={6}>
        <VStack spacing={2}>
          <Avatar m={1} mb={3} name={`${user.firstName} ${user.lastName}`} src={user.imageUrl} />
          <VoteButtons voteCount={voteCount} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} myVote={myVote} />
        </VStack>
        <Box>
          <Box fontSize={{ base: 'sm', md: 'md' }}>
            posted in <RLink to={`/channels/${uriName}`}>{uriName}</RLink> by <RLink to={`/users/${user.username}`}>{user.username}</RLink>
            <Tooltip hasArrow placement="top" label={toDateTimeString(createdAt)}>
              <time dateTime={new Date(createdAt * 1000).toISOString()}> {toRelativeDateString(createdAt)}</time>
            </Tooltip>
          </Box>
          <Heading size="4xl">{title}</Heading>
        </Box>
        <Spacer />
        {imageUrl && (
          <Link href={imageUrl} isExternal>
            <Box position="relative">
              <Image
                borderRadius="md"
                maxHeight={{ md: '6rem', lg: '12rem' }}
                maxWidth={{ md: '10rem', lg: '20rem' }}
                src={imageUrl}
                alt="Post image"
              />
              <Button size="xs" colorScheme="themeHelper" position="absolute" top="-0.15rem" right="-0.15rem">
                <FaExpand />
              </Button>
            </Box>
          </Link>
        )}
      </HStack>
      <Box px={6}>
        <ReactMarkdown components={ChakraUIRenderer()} children={rawMarkdown} skipHtml />
      </Box>
    </>
  )
}
