import { VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { postModule } from '../../../api/modules/post.module'
import { CommentItem } from './comment/CommentItem'
import { CommentItemLoading } from './comment/CommentItemLoading'

type Props = {
  postId: string
}

export const CommentSection: FC<Props> = ({ postId }) => {
  const { isLoading, data: comments, error } = useQuery(['postComments', postId], () => postModule.fetchCommentsOfPost(postId))

  if (isLoading) {
    return (
      <>
        <VStack align="stretch" spacing={6} id="comments">
          {[...Array(5)].map((_, index) => (
            <CommentItemLoading key={index} />
          ))}
        </VStack>
      </>
    )
  }

  return (
    <>
      <VStack align="stretch" spacing={6} id="comments">
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </VStack>
    </>
  )
}
