import { Button, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { RLayout } from '../../components/commons/RLayout'
import { RLink } from '../../components/commons/RLink'

export const IndexPage: FC = () => (
  <RLayout>
    <VStack>
      <RLink to="/channels/asd" _hover={{ textDecoration: 'none' }}>
        <Button colorScheme="theme">To channel page</Button>
      </RLink>
      <RLink to="/channels/asd/posts/asd" _hover={{ textDecoration: 'none' }}>
        <Button colorScheme="theme">To post page</Button>
      </RLink>
      <RLink to="/users/triszt4nn" _hover={{ textDecoration: 'none' }}>
        <Button colorScheme="theme">To user page</Button>
      </RLink>
    </VStack>
  </RLayout>
)
