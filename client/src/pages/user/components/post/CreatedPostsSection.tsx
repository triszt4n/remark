import { Box, Heading } from '@chakra-ui/react'
import { FC } from 'react'
import { PostPartial } from '../../../../api/models/post.model'
import { CreatedPost } from './CreatedPost'

type Props = {
  posts: PostPartial[] | undefined
  isLoading: boolean
  error: any
}

export const CreatedPostsSection: FC<Props> = ({ posts, isLoading, error }) => {
  if (isLoading) {
    return <></>
  }

  if (error) {
    console.log('[DEBUG] Error at ProfileDetails: CreatedPostsSection', error)
    return <></>
  }

  return (
    <>
      <Box>
        <Heading size="xl" mt={10} mb={4}>
          Posts created
        </Heading>
      </Box>
      <Box maxWidth="100%">
        <Box py={3} overflowX="auto" whiteSpace="nowrap">
          {posts?.map((post) => (
            <CreatedPost key={post.id} post={post} />
          ))}
        </Box>
      </Box>
    </>
  )
}
