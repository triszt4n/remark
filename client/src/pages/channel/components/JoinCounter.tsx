import { Box, Button, HStack } from '@chakra-ui/react'
import { ChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { toReadableNumber } from '../../../util/core-util-functions'

type Props = {
  channel: ChannelView
  joinCount: number
}

export const JoinCounter: FC<Props> = ({ channel, joinCount }) => {
  const { isLoggedIn } = useAuthContext()
  const onJoinPressed = () => {
    if (channel.amIJoined && confirm('Do you really want to leave this channel?')) {
      // todo: leaving logic
    } else if (!channel.amIJoined) {
      // todo: joining logic
    }
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
