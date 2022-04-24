import { Button, Flex, HStack, Skeleton, VStack } from '@chakra-ui/react'
import { UpdateCommentView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FaPaperPlane } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { commentModule } from '../../api/modules/comment.module'
import { postModule } from '../../api/modules/post.module'
import { RLayout } from '../../components/commons/RLayout'
import { RemarkEditor } from '../../components/editor/RemarkEditor'
import { RemarkEditorLoading } from '../../components/editor/RemarkEditorLoading'
import { queryClient } from '../../util/query-client'
import { ActionsSection } from './components/ActionsSection'
import { CommentSection } from './components/CommentSection'
import { PostDetails } from './components/PostDetails'
import { PostDetailsLoading } from './components/PostDetailsLoading'

export const PostPage: FC = () => {
  const { postId } = useParams()
  const { isLoggedIn } = useAuthContext()
  const navigate = useNavigate()
  const { isLoading, data: post, error } = useQuery(['post', postId], () => postModule.fetchPost(postId!!))
  const methods = useForm<UpdateCommentView>({ mode: 'all' })
  const {
    formState: { isSubmitting },
    handleSubmit,
    setValue
  } = methods

  const onSend = async (creatable: UpdateCommentView) => {
    if (!postId) return
    const response = await commentModule.createComment({ ...creatable, parentPostId: postId })
    if (response.status >= 200 && response.status < 300) {
      queryClient.invalidateQueries(['postComments', postId])
      setValue('rawMarkdown', '')
    } else {
      navigate(`/error`, {
        state: {
          title: 'Error occured when creating comment',
          messages: [JSON.stringify(response.data, null, 2), `${response.status} ${response.statusText}`]
        }
      })
    }
  }

  const onSubmit: SubmitHandler<UpdateCommentView> = (values) => {
    onSend(values)
  }

  if (error) {
    console.log('[DEBUG] Error at PostPage', error)
    return <Navigate replace to="/error" state={{ title: "Error when fetching post's details!", messages: [(error as any)?.message] }} />
  }

  return (
    <RLayout>
      <VStack align="stretch" spacing={10}>
        {isLoading ? (
          <>
            <PostDetailsLoading />
            <HStack>
              <Skeleton width="6rem" height="2.5rem" />
              <Flex flex={1} borderTopWidth="2px" />
            </HStack>
          </>
        ) : (
          <>
            <PostDetails post={post!!} />
            <ActionsSection post={post!!} />
          </>
        )}
        {isLoggedIn && isLoading && <RemarkEditorLoading />}
        {isLoggedIn && !isLoading && (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <RemarkEditor
                formDetails={{
                  id: 'rawMarkdown',
                  promptText: 'Share your thoughts in a markdown formatted comment!',
                  maxChar: 500
                }}
              />
              <Flex justifyContent="end">
                <Button leftIcon={<FaPaperPlane />} colorScheme="theme" isLoading={isSubmitting} type="submit">
                  Send
                </Button>
              </Flex>
            </form>
          </FormProvider>
        )}
        <CommentSection postId={postId!!} />
      </VStack>
    </RLayout>
  )
}
