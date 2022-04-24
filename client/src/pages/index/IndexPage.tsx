import { Button, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { RLayout } from '../../components/commons/RLayout'
import { RLink } from '../../components/commons/RLink'

export const IndexPage: FC = () => (
  <RLayout>
    <VStack>
      <RLink to="/ch/welcome" _hover={{ textDecoration: 'none' }}>
        <Button colorScheme="theme">Channel page: ch/welcome</Button>
      </RLink>
      <RLink to="/channels/new" _hover={{ textDecoration: 'none' }}>
        <Button colorScheme="theme">Create channel</Button>
      </RLink>
    </VStack>
  </RLayout>
)
