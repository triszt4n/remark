import { Box, Heading } from '@chakra-ui/react'
import { FC } from 'react'
import { ChannelPartial } from '../../../../api/models/channel.model'
import { JoinedChannel } from './JoinedChannel'

type Props = {
  channels: ChannelPartial[] | undefined
  isLoading: boolean
  error: any
}

export const JoinedChannelsSection: FC<Props> = ({ channels, isLoading, error }) => {
  if (isLoading) {
    return <></>
  }

  if (error) {
    console.log('[DEBUG] Error at ProfileDetails: JoinedChannelsSection', error)
    return <></>
  }

  return (
    <>
      <Box>
        <Heading size="xl" mt={10} mb={4}>
          Channels joined
        </Heading>
      </Box>
      <Box maxWidth="100%">
        <Box py={3} overflowX="auto" whiteSpace="nowrap">
          {channels?.map((channel) => (
            <JoinedChannel key={channel.id} channel={channel} />
          ))}
        </Box>
      </Box>
    </>
  )
}
