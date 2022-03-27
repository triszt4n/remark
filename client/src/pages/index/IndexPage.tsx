import { FC } from 'react'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'
import { RLayout } from '../../components/commons/RLayout'
import { Posts } from './components/Posts'

export const IndexPage: FC = () => (
  <RLayout>
    <Posts />
    <PuzzleAnimated text="Hello there" />
  </RLayout>
)
