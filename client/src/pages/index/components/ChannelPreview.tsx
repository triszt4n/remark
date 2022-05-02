import { Badge, Box, Button, Heading, HStack, LinkBox, LinkOverlay, Spacer, useBreakpointValue } from '@chakra-ui/react'
import { ChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FaCheck, FaPlus } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { ellipsifyLongText, toReadableNumber, toRelativeDateString } from '../../../util/core-util-functions'

type Props = {
  channel: ChannelView
  onJoinPressed: (channel: ChannelView) => void
  isSendLoading: boolean
}

export const ChannelPreview: FC<Props> = ({ channel, onJoinPressed, isSendLoading }) => {
  return (
    <LinkBox borderWidth="1px" borderRadius="lg" p={6}>
      <HStack mb={4}>
        <Box flex={1}>
          <Heading size={useBreakpointValue({ base: 'lg', sm: 'xl' })}>
            ch/
            <LinkOverlay as={Link} to={`/ch/${channel.uriName}`}>
              {channel.uriName}
            </LinkOverlay>
          </Heading>
          {channel.amIOwner && <Badge colorScheme="theme">Owned by you</Badge>}
          <Heading size="md" mb={3} mt={6}>
            {channel.title}
          </Heading>
          <Box wordBreak="break-all" fontSize={{ base: 'sm', md: 'md' }}>
            <ReactMarkdown allowedElements={[]} unwrapDisallowed children={ellipsifyLongText(channel.descRawMarkdown, 300)} skipHtml />
          </Box>
        </Box>
      </HStack>
      <HStack spacing={2}>
        <Box fontSize="sm">
          <Box>
            Founded <time dateTime={new Date(channel.createdAt).toISOString()}>{toRelativeDateString(channel.createdAt)}</time>
          </Box>
          <Box>{channel.postsCount} posts published</Box>
        </Box>
        <Spacer />
        <Box>
          <strong>{toReadableNumber(channel.joinCount)}</strong> joined
        </Box>
        <Button
          leftIcon={channel.amIJoined ? <FaCheck /> : <FaPlus />}
          colorScheme="theme"
          variant={channel.amIJoined ? 'outline' : 'solid'}
          onClick={() => onJoinPressed(channel)}
          isLoading={isSendLoading}
        >
          {channel.amIJoined ? 'Joined' : 'Join'}
        </Button>
      </HStack>
    </LinkBox>
  )
}
