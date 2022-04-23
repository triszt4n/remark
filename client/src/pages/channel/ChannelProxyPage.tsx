import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { channelModule } from '../../api/modules/channel.module'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'
import { RLayout } from '../../components/commons/RLayout'

export const ChannelProxyPage: FC = () => {
  const { uriName } = useParams()
  const { isLoading, data, error } = useQuery(['channel', uriName], () => channelModule.fetchChannelIdByUriName(uriName!!))

  if (isLoading) {
    return (
      <RLayout>
        <PuzzleAnimated text="Loading" />
      </RLayout>
    )
  }

  if (error) {
    console.error('[DEBUG] Error at ChannelProxyPage', error)
    return <Navigate replace to="/error" state={{ title: 'Error occured loading channel', messages: [(error as any)?.message] }} />
  }

  const { id } = data!!
  return <Navigate replace to={`/channels/${id}`} />
}
