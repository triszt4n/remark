import { Code, Heading, useToast, VStack } from '@chakra-ui/react'
import { ChannelView, PostView, UpdatePostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { postModule } from '../../../api/modules/post.module'
import { PostForm } from './PostForm'

export const EditPostPage: FC = () => {
  const { post } = useLocation().state as { post: PostView; channel: ChannelView }
  const { postId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { isLoggedIn } = useAuthContext()

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

  if (!post.amIPublisher && !post.channel.amIModerator && !post.channel.amIOwner) {
    return (
      <Navigate
        replace
        to="/error"
        state={{
          title: 'Access forbidden',
          messages: [
            'The action you intended to do is restricted users with proper access to the resource',
            "Please contact the resource's owner for further actions"
          ],
          backPath: -2
        }}
      />
    )
  }

  const mutation = useMutation(postModule.updatePost, {
    onSuccess: () => {
      navigate(`/posts/${postId}`)
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at updatePost', err.toJSON())
      toast({
        title: 'Error occured when updating post',
        description: `${err.response.status} ${err.response.data.message} Try again later.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onSend = (updatable: UpdatePostView) => {
    if (!postId) return
    mutation.mutate({ id: postId, postData: updatable })
  }

  return (
    <VStack spacing={6} alignItems="stretch">
      <Heading fontSize="3xl">
        Edit your post in <Code fontSize="3xl">ch/{post.channel.uriName}</Code>
      </Heading>
      <PostForm onSend={onSend} sendButtonText="Save" defaultValues={post} />
    </VStack>
  )
}
