import { Box, Heading, Skeleton } from '@chakra-ui/react'
import { ChannelPartialView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { rconsole } from '../../../../util/remark-console'
import { JoinedChannel } from './JoinedChannel'

type Props = {
  channels: ChannelPartialView[] | undefined
  isLoading: boolean
  error: any
  userId: string
}

export const JoinedChannelsSection: FC<Props> = ({ channels, isLoading, error, userId }) => {
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
    rconsole.log('Error at ProfileDetails: JoinedChannelsSection', error)
    return (
      <>
        <Box>
          <Heading size="xl" mt={10} mb={4}>
            Channels joined
          </Heading>
        </Box>
        <Box maxWidth="100%">
          <Box>Error when fetching joined channels! {error?.response.data.message}</Box>
        </Box>
      </>
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
        {channels?.length == 0 ? (
          <Box>No channels found</Box>
        ) : (
          <Box py={3} overflowX="auto" whiteSpace="nowrap">
            {channels?.map((channel) => (
              <JoinedChannel key={channel.id} channel={channel} userId={userId} />
            ))}
          </Box>
        )}
      </Box>
    </>
  )
}
