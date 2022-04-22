import { Box, Center, HStack, Skeleton, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { channelModule } from '../../../../api/modules/channel.module'
import { toReadableNumber } from '../../../../util/core-util-functions'
import { ModeratorItem } from './ModeratorItem'
import { ModeratorItemLoading } from './ModeratorItemLoading'

export const ModeratorsSection: FC<{ channelId: string }> = ({ channelId }) => {
  const { isLoading, data, error } = useQuery(['channelModerators', channelId], () => channelModule.fetchModeratorInfoOfChannel(channelId))

  if (isLoading) {
    return (
      <>
        <HStack mb={2} spacing={2}>
          <Text fontSize="sm">Moderators</Text>
          <Skeleton width="1.25rem" height="0.8rem"></Skeleton>
        </HStack>
        {[...Array(3)].map((_, index) => (
          <ModeratorItemLoading key={index} />
        ))}
      </>
    )
  }

  if (error) {
    console.log('[DEBUG] at ChannelPage: ModeratorsTab', error)
    return (
      <Box width="full">
        <Center fontSize="lg">Error when fetching channel's moderators! {(error as any).response.statusText}</Center>
      </Box>
    )
  }

  const { owner, moderators } = data!!

  return (
    <>
      <Text fontSize="sm" mb={2}>
        Moderators ({toReadableNumber(moderators.length + 1)})
      </Text>
      <ModeratorItem user={owner} subtitle="founder" />
      {moderators.map((mod) => (
        <ModeratorItem key={mod.username} user={mod} />
      ))}
    </>
  )
}
