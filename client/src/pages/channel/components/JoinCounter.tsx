import { Box, Button, HStack, useToast } from '@chakra-ui/react'
import { ChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { channelModule } from '../../../api/modules/channel.module'
import { toReadableNumber } from '../../../util/core-util-functions'
import { queryClient } from '../../../util/query-client'

type Props = {
  channel: ChannelView
  joinCount: number
}

export const JoinCounter: FC<Props> = ({ channel, joinCount }) => {
  const { isLoggedIn } = useAuthContext()
  const toast = useToast()

  const mutation = useMutation(channelModule.joinOrLeaveChannel, {
    onSuccess: () => {
      const wasIJoined = channel.amIJoined
      queryClient.invalidateQueries(['channelInfo', channel.id])
      toast({
        status: 'success',
        title: 'Successful action',
        description: `You've ${wasIJoined ? 'left' : 'joined'} ch/${channel.uriName}.`,
        isClosable: true
      })
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at joinOrLeaveChannel', err.toJSON())
      toast({
        title: 'Error occured when joining or leaving channel. Try again later.',
        description: `${err.response.status} ${err.message}`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onJoinPressed = () => {
    if (channel.amIJoined && confirm('Do you really want to leave this channel?'))
      mutation.mutate({ id: channel.id, intent: channel.amIJoined ? 'leave' : 'join' })
  }

  return (
    <HStack ml="auto">
      <Box>{toReadableNumber(joinCount)} joined</Box>
      {isLoggedIn && (
        <Button colorScheme="theme" variant={channel.amIJoined ? 'outline' : 'solid'} onClick={onJoinPressed}>
          {channel.amIJoined ? 'Leave' : 'Join'}
        </Button>
      )}
    </HStack>
  )
}
