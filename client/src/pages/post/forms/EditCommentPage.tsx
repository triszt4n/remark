import { Box, Heading, useToast, VStack } from '@chakra-ui/react'
import { CommentView, PostView, UpdateCommentView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { useStatefulQuery } from '../../../api/hooks/useStatefulQuery'
import { commentModule } from '../../../api/modules/comment.module'
import { postModule } from '../../../api/modules/post.module'
import { PuzzleAnimated } from '../../../components/commons/PuzzleAnimated'
import { RLink } from '../../../components/commons/RLink'
import { queryClient } from '../../../util/query-client'
import { CommentForm } from './CommentForm'

const errorHandler = (error: any) => {
  if (error) {
    console.error('[DEBUG] Error at EditCommentPage', error)
    return (
      <Navigate
        replace
        to="/error"
        state={{ title: 'Error occured loading post or comment info', messages: [(error as any)?.response.data.message] }}
      />
    )
  }
}

export const EditCommentPage: FC = () => {
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

  const { postId } = useParams()
  const {
    isLoading: isLoadingPost,
    error: errorPost,
    data: post
  } = useStatefulQuery<PostView>('post', ['post', postId], () => postModule.fetchPost(postId!!))

  const { commentId } = useParams()
  const {
    isLoading: isLoadingComment,
    error: errorComment,
    data: comment
  } = useStatefulQuery<CommentView>('comment', ['comment', commentId], () => commentModule.fetchComment(commentId!!))

  if (isLoadingPost || isLoadingComment) {
    return <PuzzleAnimated text="Loading" />
  }

  errorHandler(errorPost)
  errorHandler(errorComment)

  if (!post?.amIPublisher && !post?.channel.amIModerator && !post?.channel.amIOwner) {
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

  const mutation = useMutation(commentModule.updateComment, {
    onSuccess: () => {
      navigate(`/posts/${post.id}`)
      queryClient.invalidateQueries(['postComments', [post.id]])
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at updateComment', err.toJSON())
      toast({
        title: 'Error occured when updating comment',
        description: `${err.response.status} ${err.response.data.message} Try again later.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onSend = (updatable: UpdateCommentView) => {
    if (!commentId) return
    mutation.mutate({ id: commentId, commentData: updatable })
  }

  return (
    <VStack spacing={6} alignItems="stretch">
      <Heading fontSize="3xl">Edit comment</Heading>
      <Box>
        Comment by <RLink to={`/u/${comment?.publisher.username}`}>{comment?.publisher.username}</RLink> under post titled{' '}
        <RLink to={`/posts/${post.id}`}>{post.title}</RLink>
      </Box>
      <CommentForm onSend={onSend} buttonProps={{ sendButtonText: 'Save' }} defaultValues={comment} isSendLoading={mutation.isLoading} />
    </VStack>
  )
}
