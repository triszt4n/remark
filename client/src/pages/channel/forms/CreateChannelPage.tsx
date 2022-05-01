import { useToast } from '@chakra-ui/react'
import { CreateChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { channelModule } from '../../../api/modules/channel.module'
import { ChannelForm } from './ChannelForm'

export const CreateChannelPage: FC = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { isLoggedIn } = useAuthContext()

  if (!isLoggedIn) {
    return (
      <Navigate
        replace
        to="/error"
        state={{
          title: 'You are not logged in',
          messages: [
            'The action you intended to do is restricted to authenticated users',
            'Please log in via the Log in button in the navigation bar'
          ],
          backPath: -2
        }}
      />
    )
  }

  const mutation = useMutation(channelModule.createChannel, {
    onSuccess: ({ data }) => {
      navigate(`/channels/${data.id}`)
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at createChannel', err.toJSON())
      toast({
        title: 'Error occured when creating channel',
        description: `${err.response.status} ${err.response.data.message} Try again later.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onSend = async (creatable: CreateChannelView) => {
    mutation.mutate(creatable)
  }

  return <ChannelForm onSend={onSend} sendButtonText="Create" isSendLoading={mutation.isLoading} />
}
