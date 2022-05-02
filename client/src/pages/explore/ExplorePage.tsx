import { Box, Heading, HStack, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { FaHammer, FaWrench } from 'react-icons/fa'

export const ExplorePage: FC = () => {
  return (
    <VStack spacing={6} alignItems="center">
      <Heading>
        <HStack spacing={6}>
          <FaHammer />
          <Box>This page is under construction</Box>
          <FaWrench />
        </HStack>
      </Heading>
    </VStack>
  )
}
