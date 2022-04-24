import { ChannelView, UpdateChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { channelModule } from '../../../api/modules/channel.module'
import { RLayout } from '../../../components/commons/RLayout'
import { ChannelForm } from './ChannelForm'

export const EditChannelPage: FC = () => {
  const state = useLocation().state as { channel: ChannelView }
  const { channelId } = useParams()
  const navigate = useNavigate()

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

  return (
    <RLayout>
      <ChannelForm onSend={onSend} sendButtonText="Save" defaultValues={state.channel} />
    </RLayout>
  )
}