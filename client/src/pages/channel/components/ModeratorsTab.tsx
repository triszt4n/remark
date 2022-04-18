import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import { PuzzleAnimated } from '../../../components/commons/PuzzleAnimated'

export const ModeratorsTab: FC<{ uriName: string }> = ({ uriName }) => {
  const { isLoading, data: moderators, error } = useQuery(['channelModerators', uriName], () => {})

  if (isLoading) {
    return <PuzzleAnimated text="Loading channel" />
  }

  if (error) {
    console.log('[DEBUG] at ChannelPage: ModeratorsTab', error)
    return <Navigate replace to="/error?messages=Error when fetching channel's moderators!" />
  }

  return <div>ModeratorsTab</div>
}
