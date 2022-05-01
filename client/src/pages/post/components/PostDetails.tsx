import { useBreakpointValue, useToast, VStack } from '@chakra-ui/react'
import { PostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { postModule } from '../../../api/modules/post.module'
import { FailedVotingModal } from '../../../components/voting/FailedVotingModal'
import { queryClient } from '../../../util/query-client'
import { PostDetailsDesktop } from './PostDetailsDesktop'
import { PostDetailsMobile } from './PostDetailsMobile'

type Props = {
  post: PostView
}

export const PostDetails: FC<Props> = ({ post }) => {
  const { isLoggedIn } = useAuthContext()
  const toast = useToast()
  const navigate = useNavigate()
  const unauthorizedToast = () =>
    toast({
      render: ({ onClose }) => (
        <FailedVotingModal
          onClose={onClose}
          message="Please log in to vote!"
          actionButton={{ text: 'Log in here', onClick: () => navigate('/login') }}
        />
      )
    })

  const voteMutation = useMutation(postModule.votePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', post.id])
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at votePost', err.toJSON())
      toast({
        title: 'Error occured when sending vote',
        description: `${err.response.status} ${err.response.data.message} Try again later.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onUpvotePressed = () => {
    if (!isLoggedIn) {
      return unauthorizedToast()
    }
    voteMutation.mutate({ id: post.id, voteType: post.myVote === 'up' ? 'none' : 'up' })
  }
  const onDownvotePressed = () => {
    if (!isLoggedIn) {
      return unauthorizedToast()
    }
    voteMutation.mutate({ id: post.id, voteType: post.myVote === 'down' ? 'none' : 'down' })
  }

  return (
    <VStack spacing={{ base: 4, md: 10 }} align="stretch">
      {useBreakpointValue({
        base: <PostDetailsMobile post={post} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} />,
        md: <PostDetailsDesktop post={post} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} />
      })}
    </VStack>
  )
}
