import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'
import { RLayout } from '../../components/commons/RLayout'

export const PostPage: FC = () => {
  const { id } = useParams()
  const { isLoggedIn } = useAuthContext()
  const { isLoading, data: post, error } = useQuery(['post', id], () => {})

  if (isLoading) {
    return (
      <RLayout>
        <PuzzleAnimated text="Loading post" />
      </RLayout>
    )
  }

  if (error) {
    console.log('[DEBUG] at PostPage: ???', error)
    return <Navigate replace to="/error?messages=Error when fetching post's details!" />
  }

  return <RLayout>asd</RLayout>
}
