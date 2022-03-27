import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'
import { RLayout } from '../../components/commons/RLayout'

export const ChannelPage: FC = () => {
  const uriName = 'asd'
  const { isLoggedIn } = useAuthContext()
  const { isLoading, data: channel, error } = useQuery(['channel', uriName], () => {})

  if (isLoading || !channel) {
    return (
      <RLayout>
        <PuzzleAnimated text="Loading channel" />
      </RLayout>
    )
  }

  if (error) {
    console.log('[DEBUG] at ChannelPage: ???', error)
    return <Navigate replace to="/error?messages=Error when fetching channel's details!" />
  }

  return <RLayout>asd</RLayout>
}
