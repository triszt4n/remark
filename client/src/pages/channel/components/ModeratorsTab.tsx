import { Center, Skeleton, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { User } from '../../../api/models/user.model'
import { toReadableNumber } from '../../../util/core-util-functions'
import { ModeratorItem } from './moderator/ModeratorItem'
import { ModeratorItemLoading } from './moderator/ModeratorItemLoading'

const FAKE_DATA: { owner: User; moderators: User[] } = {
  // todo: delete
  owner: {
    imageUrl:
      'https://scontent.fbud4-1.fna.fbcdn.net/v/t1.6435-9/180978949_314228950059549_1005358403722529104_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=TghG0FaBcCgAX_7zWqB&_nc_ht=scontent.fbud4-1.fna&oh=00_AT-iOuxSFqijJtyc0FyxvB6gvaPXcJspczQZuePUjbBQqA&oe=6284478E',
    username: 'triszt4n',
    firstName: 'user',
    lastName: 'name',
    email: 'none',
    id: '1234'
  },
  moderators: [
    {
      username: 'POTUS',
      firstName: 'user',
      lastName: 'name',
      email: 'none',
      id: '23455'
    }
  ]
}

export const ModeratorsTab: FC<{ uriName: string }> = ({ uriName }) => {
  const { isLoading, data, error } = useQuery(['channelModerators', uriName], () => {})
  const { owner, moderators } = FAKE_DATA // = data

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

  return (
    <>
      <Stat textAlign="end" mb={6}>
        <StatLabel>Statistics</StatLabel>
        <StatNumber>{toReadableNumber(12)} moderators in channel</StatNumber>
      </Stat>
      <ModeratorItem user={owner} subtitle="founder" />
      {moderators.map((mod) => (
        <ModeratorItem user={mod} />
      ))}
    </>
  )
}
