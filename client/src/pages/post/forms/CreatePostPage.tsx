import { UpdatePostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postModule } from '../../../api/modules/post.module'
import { RLayout } from '../../../components/commons/RLayout'
import { PostForm } from './PostForm'

export const CreateChannelPage: FC = () => {
  const navigate = useNavigate()
  const { channelId } = useParams()

  const onSend = async (creatable: UpdatePostView) => {
    if (!channelId) return
    const response = await postModule.createPost({ ...creatable, parentChannelId: channelId })
    if (response.status >= 200 && response.status < 300) {
      navigate(`/channels/${channelId}/posts/${response.data.id}`)
    } else {
      navigate(`/error`, {
        state: {
          title: 'Error occured when creating post',
          messages: [JSON.stringify(response.data, null, 2), `${response.status} ${response.statusText}`]
        }
      })
    }
  }

  return (
    <RLayout>
      <PostForm onSend={onSend} sendButtonText="Create" />
    </RLayout>
  )
}
