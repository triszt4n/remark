import { Code, Heading, VStack } from '@chakra-ui/react'
import { ChannelView, UpdatePostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { postModule } from '../../../api/modules/post.module'
import { RLayout } from '../../../components/commons/RLayout'
import { PostForm } from './PostForm'

export const CreatePostPage: FC = () => {
  const navigate = useNavigate()
  const { channelId } = useParams()
  const { channel } = useLocation().state as { channel: ChannelView }

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
      <VStack spacing={6} alignItems="stretch">
        <Heading fontSize="3xl">
          Create post in <Code fontSize="3xl">ch/{channel.uriName}</Code>
        </Heading>
        <PostForm onSend={onSend} sendButtonText="Create" />
      </VStack>
    </RLayout>
  )
}
