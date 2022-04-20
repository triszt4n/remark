import { Box, HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import { FC } from 'react'

export const ModeratorItemLoading: FC = () => {
  return (
    <Box p={2}>
      <HStack spacing={4}>
        <Box>
          <SkeletonCircle size="12" />
        </Box>
        <Box flex={1}>
          <Skeleton height="1.5rem" width={{ base: '100%', md: '50%' }} />
        </Box>
      </HStack>
    </Box>
  )
}
