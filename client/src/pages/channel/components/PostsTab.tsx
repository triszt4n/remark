import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import { PostPreviewLoading } from './post/PostPreviewLoading'

export const PostsTab: FC<{ uriName: string }> = ({ uriName }) => {
  const { isLoading, data: channel, error } = useQuery(['channelPosts', uriName], () => {})

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
    return <Navigate replace to="/error?messages=Error when fetching channel's posts!" />
  }

  return <div>PostsTab</div>
}
