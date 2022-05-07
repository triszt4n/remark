import { Heading, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'

export const ExplorePage: FC = () => {
  return (
    <VStack spacing={6} alignItems="center">
      <Heading size="3xl" my={10} textAlign="center">
        This page is under construction
      </Heading>
      <PuzzleAnimated />
    </VStack>
  )
}
