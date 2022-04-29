import { Code, Heading, useToast, VStack } from '@chakra-ui/react'
import { ChannelView, UpdatePostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { postModule } from '../../../api/modules/post.module'
import { PostForm } from './PostForm'

export const CreatePostPage: FC = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { channel } = useLocation().state as { channel: ChannelView }
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

  const mutation = useMutation(postModule.createPost, {
    onSuccess: ({ data }) => {
      navigate(`/posts/${data.id}`)
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at createPost', err.toJSON())
      toast({
        title: 'Error occured when creating post. Try again later.',
        description: `${err.response.status} ${err.message}`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onSend = (creatable: UpdatePostView) => {
    mutation.mutate({ ...creatable, parentChannelId: channel.id })
  }

  return (
    <VStack spacing={6} alignItems="stretch">
      <Heading fontSize="3xl">
        Create post in <Code fontSize="3xl">ch/{channel.uriName}</Code>
      </Heading>
      <PostForm onSend={onSend} sendButtonText="Create" showImageSection />
    </VStack>
  )
}
