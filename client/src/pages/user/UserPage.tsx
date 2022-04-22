import { VStack } from '@chakra-ui/react'
import { UserView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { RLayout } from '../../components/commons/RLayout'
import { ProfileDetails } from './components/ProfileDetails'

export const UserPage: FC = () => {
  const { state } = useLocation()
  const { user } = state as { user: UserView }

  return (
    <RLayout>
      <VStack alignItems="flex-start">
        <ProfileDetails user={user} />
      </VStack>
    </RLayout>
  )
}
