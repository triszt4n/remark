import { Box, Heading, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'

export const ExplorePage: FC = () => {
  return (
    <VStack spacing={6} alignItems="flex-start">
      <Heading>This is the sandbox page for now.</Heading>
      <Box>
        <PuzzleAnimated />
      </Box>
    </VStack>
  )
}
