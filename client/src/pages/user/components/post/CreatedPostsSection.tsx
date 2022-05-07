import { Box, Heading, Skeleton } from '@chakra-ui/react'
import { PostPartialView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { rconsole } from '../../../../util/remark-console'
import { CreatedPost } from './CreatedPost'

type Props = {
  posts: PostPartialView[] | undefined
  isLoading: boolean
  error: any
}

export const CreatedPostsSection: FC<Props> = ({ posts, isLoading, error }) => {
  if (isLoading) {
    return (
      <>
        <Box py={10}>
          <Skeleton width="14rem" height="2.5rem" />
        </Box>
        <Box maxWidth="100%">
          <Box py={3} overflowX="auto" whiteSpace="nowrap">
            {[...Array(2)].map((_, index) => (
              <Skeleton key={index} display="inline-block" mx={1} width="20rem" height="18rem" />
            ))}
          </Box>
        </Box>
      </>
    )
  }

  if (error) {
    rconsole.log('Error at ProfileDetails: CreatedPostsSection', error)
    return (
      <>
        <Box>
          <Heading size="xl" mt={10} mb={4}>
            Posts created
          </Heading>
        </Box>
        <Box maxWidth="100%">
          <Box>Error when fetching createad posts! {error?.response.data.message}</Box>
        </Box>
      </>
    )
  }

  return (
    <>
      <Box>
        <Heading size="xl" mt={10} mb={4}>
          Posts created
        </Heading>
      </Box>
      <Box maxWidth="100%">
        {posts?.length == 0 ? (
          <Box>No posts found</Box>
        ) : (
          <Box py={3} overflowX="auto" whiteSpace="nowrap">
            {posts?.map((post) => (
              <CreatedPost key={post.id} post={post} />
            ))}
          </Box>
        )}
      </Box>
    </>
  )
}
