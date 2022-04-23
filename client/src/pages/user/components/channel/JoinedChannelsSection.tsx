import { Box, Center, Heading, Skeleton } from '@chakra-ui/react'
import { ChannelPartialView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { JoinedChannel } from './JoinedChannel'

type Props = {
  channels: ChannelPartialView[] | undefined
  isLoading: boolean
  error: any
}

export const JoinedChannelsSection: FC<Props> = ({ channels, isLoading, error }) => {
  if (isLoading) {
    return (
      <>
        <Box py={10}>
          <Skeleton width="16rem" height="2.5rem" />
        </Box>
        <Box maxWidth="100%">
          <Box py={3} overflowX="auto" whiteSpace="nowrap">
            {[...Array(2)].map((_, index) => (
              <Skeleton key={index} display="inline-block" mx={1} w="14rem" height="10rem" />
            ))}
          </Box>
        </Box>
      </>
    )
  }

  if (error) {
    console.log('[DEBUG] Error at ProfileDetails: JoinedChannelsSection', error)
    return (
      <Box width="full">
        <Center fontSize="lg">Error when fetching joined channels! {error?.response?.statusText}</Center>
      </Box>
    )
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
