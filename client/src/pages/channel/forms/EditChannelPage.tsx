import { ChannelView, UpdateChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { channelModule } from '../../../api/modules/channel.module'
import { RLayout } from '../../../components/commons/RLayout'
import { ChannelForm } from './ChannelForm'

export const EditChannelPage: FC = () => {
  const { channel } = useLocation().state as { channel: ChannelView }
  const { channelId } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthContext()

  const onSend = async (updatable: UpdateChannelView) => {
    if (!channelId) return
    const response = await channelModule.updateChannel(channelId, updatable)
    if (response.status >= 200 && response.status < 300) {
      navigate(`/channels/${channelId}`)
    } else {
      navigate(`/error`, {
        state: {
          title: 'Error occured when updating channel',
          messages: [JSON.stringify(response.data, null, 2), `${response.status} ${response.statusText}`]
        }
      })
    }
  }

  if (!isLoggedIn) {
    return (
      <Navigate
        replace
        to="/error"
        state={{
          title: 'You are not logged in',
          messages: [
            'The action you intended to do is restricted to authenticated users',
            'Please log in via the Log in button in the navigation bar'
          ],
          backPath: -2
        }}
      />
    )
  }

  if (!channel.amIOwner) {
    return (
      <Navigate
        replace
        to="/error"
        state={{
          title: 'You are not logged in',
          messages: [
            'The action you intended to do is restricted to authenticated users',
            'Please log in via the Log in button in the navigation bar'
          ],
          backPath: -2
        }}
      />
    )
  }

  return (
    <RLayout>
      <ChannelForm onSend={onSend} sendButtonText="Save" defaultValues={channel} />
    </RLayout>
  )
}
