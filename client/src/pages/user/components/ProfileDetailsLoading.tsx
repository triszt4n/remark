import { HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import { FC } from 'react'

export const ProfileDetailsLoading: FC = () => {
  return (
    <>
      <HStack width="100%" mb={5}>
        <SkeletonCircle size="24" />
        <Skeleton height="2.25rem" width={{ base: '100%', md: '50%' }} />
      </HStack>
      <Skeleton height="1.25rem" width={{ base: '100%', md: '50%' }} mb={2} />
      <Skeleton height="1.25rem" width={{ base: '100%', md: '50%' }} />
    </>
  )
}
