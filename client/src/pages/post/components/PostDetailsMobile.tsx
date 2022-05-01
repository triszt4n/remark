import { Avatar, Box, Button, Heading, HStack, Image, Link, Tooltip, useBreakpointValue, VStack } from '@chakra-ui/react'
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
  isSendLoading: boolean
}

export const PostDetailsMobile: FC<Props> = ({ post, onUpvotePressed, onDownvotePressed, isSendLoading }) => {
  const { createdAt, publisher: user, rawMarkdown, channel, title, voteCount, myVote, imageUrl } = post

  return (
    <>
      <VStack align="stretch" spacing={4}>
        <HStack>
          <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} src={user.imageUrl} />
          <Box fontSize="sm">
            posted in <RLink to={`/channels/${channel.id}`}>{channel.uriName}</RLink> by{' '}
            <RLink to={`/u/${user.username}`}>{user.username}</RLink>
            <Tooltip hasArrow placement="top" label={toDateTimeString(createdAt)}>
              <time dateTime={new Date(createdAt * 1000).toISOString()}> {toRelativeDateString(createdAt)}</time>
            </Tooltip>
          </Box>
        </HStack>
        <Heading size={useBreakpointValue({ base: '2xl', sm: '3xl' })}>{title}</Heading>
        <HStack spacing={2}>
          <VoteButtons
            voteCount={voteCount}
            onUpvotePressed={onUpvotePressed}
            onDownvotePressed={onDownvotePressed}
            myVote={myVote}
            isSendLoading={isSendLoading}
          />
        </HStack>
      </VStack>

      {imageUrl && (
        <Link href={imageUrl} isExternal>
          <Box position="relative">
            <Image borderRadius="md" src={imageUrl} alt="Dan Abramov" />
            <Button size="xs" colorScheme="themeHelper" position="absolute" top="-0.15rem" right="-0.15rem">
              <FaExpand />
            </Button>
          </Box>
        </Link>
      )}
      <Box>
        <ReactMarkdown components={ChakraUIRenderer()} children={rawMarkdown} skipHtml />
      </Box>
    </>
  )
}
