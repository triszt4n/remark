import { Center, Skeleton, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { channelModule } from '../../../api/modules/channel.module'
import { toReadableNumber } from '../../../util/core-util-functions'
import { ModeratorItem } from './moderator/ModeratorItem'
import { ModeratorItemLoading } from './moderator/ModeratorItemLoading'

export const ModeratorsTab: FC<{ uriName: string }> = ({ uriName }) => {
  const { isLoading, data, error } = useQuery(['channelModerators', uriName], () => channelModule.fetchModeratorInfoOfChannel(uriName))

  if (isLoading) {
    return (
      <>
        <Stat textAlign="end" mb={6}>
          <StatLabel>Statistics</StatLabel>
          <Skeleton height="2rem" width="40%" ml="auto" />
        </Stat>
        {[...Array(3)].map(() => (
          <ModeratorItemLoading />
        ))}
      </>
    )
  }

  if (error) {
    console.log('[DEBUG] at ChannelPage: ModeratorsTab', error)
    return <Center fontSize="lg">Error when fetching channel's moderators!</Center>
  }

  const { owner, moderators } = data!!

  return (
    <>
      <Stat textAlign="end" mb={6}>
        <StatLabel>Statistics</StatLabel>
        <StatNumber>{toReadableNumber(moderators.length + 1)} moderators in channel</StatNumber>
      </Stat>
      <ModeratorItem user={owner} subtitle="founder" />
      {moderators.map((mod) => (
        <ModeratorItem user={mod} />
      ))}
    </>
  )
}
