import { Flex } from '@chakra-ui/react'

export const RContainer: React.FC = ({ children }) => (
  <Flex flexDirection="column" px={4} py={4} mx="auto" maxWidth={['100%', '48rem', '48rem', '64rem']}>
    {children}
  </Flex>
)
