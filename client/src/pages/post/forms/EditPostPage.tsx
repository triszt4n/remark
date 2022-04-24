import { Code, Heading, VStack } from '@chakra-ui/react'
import { ChannelView, PostView, UpdatePostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { postModule } from '../../../api/modules/post.module'
import { RLayout } from '../../../components/commons/RLayout'
import { PostForm } from './PostForm'

export const EditPostPage: FC = () => {
  const { post, channel } = useLocation().state as { post: PostView; channel: ChannelView }
  const { postId, channelId } = useParams()
  const navigate = useNavigate()

  const onSend = async (updatable: UpdatePostView) => {
    if (!postId || !channelId) return
    const response = await postModule.updatePost(postId, updatable)
    if (response.status >= 200 && response.status < 300) {
      navigate(`/channels/${channelId}/posts/${postId}`)
    } else {
      navigate(`/error`, {
        state: {
          title: 'Error occured when updating post',
          messages: [JSON.stringify(response.data, null, 2), `${response.status} ${response.statusText}`]
        }
      })
    }
  }

  return (
    <RLayout>
      <VStack spacing={6} alignItems="stretch">
        <Heading fontSize="3xl">
          Edit your post in <Code fontSize="3xl">ch/{channel.uriName}</Code>
        </Heading>
        <PostForm onSend={onSend} sendButtonText="Save" defaultValues={post} />
      </VStack>
    </RLayout>
  )
}
