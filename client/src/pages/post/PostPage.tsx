import { VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { postModule } from '../../api/modules/post.module'
import { RLayout } from '../../components/commons/RLayout'
import { RemarkEditor } from '../../components/editor/RemarkEditor'
import { ActionsSection } from './components/ActionsSection'
import { CommentSection } from './components/CommentSection'
import { PostDetails } from './components/PostDetails'

export const PostPage: FC = () => {
  const { id } = useParams()
  const { isLoggedIn } = useAuthContext()
  const { isLoading, data: post, error } = useQuery(['post', id], () => postModule.fetchPost(id!!))
  const onSend = () => {}

  if (error) {
    console.log('[DEBUG] at PostPage: ???', error)
    return <Navigate replace to="/error?messages=Error when fetching post's details!" />
  }

  return (
    <RLayout>
      <VStack align="stretch" spacing={10}>
        <PostDetails post={post} isLoading={isLoading} />
        <ActionsSection post={post} />
        {isLoggedIn && <RemarkEditor promptText="Share your thoughts in a comment!" submitButtonText="Send comment" onSend={onSend} />}
        <CommentSection postId={id!!} />
      </VStack>
    </RLayout>
  )
}
