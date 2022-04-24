import { CreateChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { channelModule } from '../../../api/modules/channel.module'
import { RLayout } from '../../../components/commons/RLayout'
import { ChannelForm } from './ChannelForm'

export const CreateChannelPage: FC = () => {
  const navigate = useNavigate()

  const onSend = async (creatable: CreateChannelView) => {
    const response = await channelModule.createChannel(creatable)
    if (response.status >= 200 && response.status < 300) {
      navigate(`/channels/${response.data.id}`)
    } else {
      navigate(`/error`, {
        state: {
          title: 'Error occured when creating channel',
          messages: [JSON.stringify(response.data, null, 2), `${response.status} ${response.statusText}`]
        }
      })
    }
  }

  return (
    <RLayout>
      <ChannelForm onSend={onSend} sendButtonText="Create" />
    </RLayout>
  )
}
