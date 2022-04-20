import { Center, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Post } from '../../../api/models/post.model'
import { PostPreview } from './post/PostPreview'
import { PostPreviewLoading } from './post/PostPreviewLoading'

// todo: remove
const FAKE_POSTS: Post[] = [
  {
    createdAt: 1650463827,
    title: 'What am I doing here?',
    rawMarkdown: '### Never say never\n\nSaid someone very wise.\n',
    publisherUsername: 'triszt4n',
    parentChannelUriName: 'asd',
    votes: 123
  },
  {
    createdAt: 1680460000,
    title: "It is what it's supposed to be",
    rawMarkdown: '# HIHIHI\n\n* hahaha\n* hohoho\n\nnyeh.\n',
    publisherUsername: 'triszt4n',
    parentChannelUriName: 'asd',
    votes: -21
  }
]

export const PostsTab: FC<{ uriName: string }> = ({ uriName }) => {
  const { isLoading, data /*: posts */, error } = useQuery(['channelPosts', uriName], () => {})
  const posts = FAKE_POSTS // todo: remove

  if (isLoading) {
    return (
      <>
        {[...Array(5)].map(() => (
          <PostPreviewLoading />
        ))}
      </>
    )
  }

  if (error) {
    console.log('[DEBUG] at ChannelPage: PostsTab', error)
    return <Center fontSize="lg">Error when fetching channel's posts!</Center>
  }

  return (
    <VStack spacing={4} align="stretch">
      {posts.map((post) => (
        <PostPreview post={post} />
      ))}
    </VStack>
  )
}
