import { HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import { FC } from 'react'

export const ModeratorItemLoading: FC = () => {
  return (
    <HStack spacing={4} p={2}>
      <SkeletonCircle size="10" />
      <Skeleton flex={1} height="1.25rem" width={{ base: '100%', md: '50%' }} />
    </HStack>
  )
}
