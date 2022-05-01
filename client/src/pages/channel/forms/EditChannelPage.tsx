import { useToast } from '@chakra-ui/react'
import { ChannelView, UpdateChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { useStatefulQuery } from '../../../api/hooks/useStatefulQuery'
import { channelModule } from '../../../api/modules/channel.module'
import { PuzzleAnimated } from '../../../components/commons/PuzzleAnimated'
import { ChannelForm } from './ChannelForm'

export const EditChannelPage: FC = () => {
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

  const { channelId } = useParams()
  const {
    isLoading,
    error,
    data: channel
  } = useStatefulQuery<ChannelView>('channel', ['channelInfo', channelId], () => channelModule.fetchChannel(channelId!!))

  if (isLoading) {
    return <PuzzleAnimated text="Loading" />
  }

  if (error) {
    console.error('[DEBUG] Error at EditChannelPage', error)
    return (
      <Navigate replace to="/error" state={{ title: 'Error occured loading channel', messages: [(error as any)?.response.data.message] }} />
    )
  }

  const mutation = useMutation(channelModule.updateChannel, {
    onSuccess: () => {
      navigate(`/channels/${channelId}`)
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at updateChannel', err.toJSON())
      toast({
        title: 'Error occured when updating channel',
        description: `${err.response.status} ${err.response.data.message} Try again later.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onSend = async (updatable: UpdateChannelView) => {
    if (!channelId) return
    mutation.mutate({ id: channelId, channelData: updatable })
  }

  if (!channel?.amIOwner) {
    return (
      <Navigate
        replace
        to="/error"
        state={{
          title: 'Access forbidden',
          messages: [
            'The action you intended to do is restricted users with proper access to the resource',
            "Please contact the resource's owner for further actions"
          ],
          backPath: -2
        }}
      />
    )
  }

  return <ChannelForm onSend={onSend} sendButtonText="Save" defaultValues={channel} isSendLoading={mutation.isLoading} />
}
