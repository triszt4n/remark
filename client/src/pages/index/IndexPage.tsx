import { Button, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { RLayout } from '../../components/commons/RLayout'
import { RLink } from '../../components/commons/RLink'

export const IndexPage: FC = () => (
  <RLayout>
    <VStack>
      <RLink to="/ch/welcome" _hover={{ textDecoration: 'none' }}>
        <Button colorScheme="theme">To channel page</Button>
      </RLink>
      <RLink to="/u/triszt4n" _hover={{ textDecoration: 'none' }}>
        <Button colorScheme="theme">To user page</Button>
      </RLink>
    </VStack>
  </RLayout>
)
