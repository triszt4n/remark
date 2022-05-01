import { Badge, Box, Button, Code, Heading, LinkBox, LinkOverlay, Text, useToast, VStack } from '@chakra-ui/react'
import { ChannelPartialView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../../api/contexts/auth/useAuthContext'
import { channelModule } from '../../../../api/modules/channel.module'
import { ellipsifyLongText, toReadableNumber, toRelativeDateString } from '../../../../util/core-util-functions'
import { queryClient } from '../../../../util/query-client'

type Props = {
  channel: ChannelPartialView
  userId: string
}

export const JoinedChannel: FC<Props> = ({ channel, userId }) => {
  const { isLoggedIn } = useAuthContext()
  const targetPath = `/channels/${channel.id}`
  const toast = useToast()

  const mutation = useMutation(channelModule.joinOrLeaveChannel, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userChannels', userId])
      toast({
        status: 'success',
        title: 'Successful action',
        description: `You've left ch/${channel.uriName}.`,
        isClosable: true
      })
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at joinOrLeaveChannel', err.toJSON())
      toast({
        title: 'Error occured when leaving channel',
        description: `${err.response.status} ${err.response.data.message || err.message} Try again later.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onJoinPressed = () => {
    if (channel.amIJoined) {
      if (confirm('Do you really want to leave this channel?')) mutation.mutate({ id: channel.id, intent: 'leave' })
    } else {
      mutation.mutate({ id: channel.id, intent: 'join' })
    }
  }

  return (
    <LinkBox display="inline-block" mx={1} borderWidth="1px" borderRadius="md" p={3} w="14rem">
      <VStack>
        <Code fontSize="xs">ch/{channel.uriName}</Code>
        <Heading size="sm">
          <LinkOverlay as={Link} to={targetPath}>
            {ellipsifyLongText(channel.title, 32)}
          </LinkOverlay>
        </Heading>
        <Box>
          <Badge colorScheme="theme" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
            {toReadableNumber(channel.joinCount)} joined
          </Badge>
        </Box>
        {isLoggedIn && (
          <VStack justifyContent="center">
            <Box>
              <Button
                size="sm"
                colorScheme="theme"
                variant={channel.amIJoined ? 'outline' : 'solid'}
                onClick={onJoinPressed}
                isLoading={mutation.isLoading}
              >
                {channel.amIJoined ? 'Leave' : 'Join'}
              </Button>
            </Box>
            <Box>
              <Text fontSize="xs">joined {toRelativeDateString(channel.joinedAt)}</Text>
            </Box>
          </VStack>
        )}
      </VStack>
    </LinkBox>
  )
}
