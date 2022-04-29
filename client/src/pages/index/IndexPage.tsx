import { Button, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { RLink } from '../../components/commons/RLink'

export const IndexPage: FC = () => {
  const { isLoggedIn } = useAuthContext()

  return (
    <VStack>
      <RLink to="/ch/welcometoremark" _hover={{ textDecoration: 'none' }}>
        <Button colorScheme="theme">Channel page: ch/welcometoremark</Button>
      </RLink>
      {isLoggedIn && (
        <RLink to="/channels/new" _hover={{ textDecoration: 'none' }}>
          <Button colorScheme="theme">Create channel</Button>
        </RLink>
      )}
    </VStack>
  )
}
