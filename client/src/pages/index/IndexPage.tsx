import { FC } from 'react'
import { RLayout } from '../../components/commons/RLayout'
import { Posts } from './components/Posts'
import { Users } from './components/Users'

export const IndexPage: FC = () => (
  <RLayout>
    <Posts />
    <Users />
  </RLayout>
)
