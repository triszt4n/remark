import { Box, Button, Center, Flex, useToast, VStack } from '@chakra-ui/react'
import { ChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { channelModule } from '../../api/modules/channel.module'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'
import { queryClient } from '../../util/query-client'
import { rconsole } from '../../util/remark-console'
import { ChannelPreview } from './components/ChannelPreview'

export const IndexPage: FC = () => {
  const { isLoggedIn } = useAuthContext()
  const navigate = useNavigate()
  const toast = useToast()
  const { isLoading, data: channels, error } = useQuery('channels', channelModule.fetchChannels)

  const onCreateChannelPressed = () => {
    navigate('/channels/new')
  }

  const mutation = useMutation(channelModule.joinOrLeaveChannel, {
    onSuccess: () => {
      queryClient.invalidateQueries('channels')
    },
    onError: (error) => {
      const err = error as any
      rconsole.log('Error at joinOrLeaveChannel', err.toJSON())
      toast({
        title: 'Error occured when joining or leaving channel',
        description: `${err.response.status} ${err.response.data.message || err.message} Try again later.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onJoinPressed = (channel: ChannelView) => {
    if (channel.amIJoined) {
      if (confirm(`Do you really want to leave ch/${channel.uriName}?`)) mutation.mutate({ id: channel.id, intent: 'leave' })
    } else {
      mutation.mutate({ id: channel.id, intent: 'join' })
    }
  }

  if (isLoading) {
    return <PuzzleAnimated text="Loading" />
  }

  if (error) {
    rconsole.log('Error at channels', error)
    const err = error as any
    return (
      <Box width="full">
        <Center fontSize="xl" fontWeight={700}>
          Error when fetching channels! {err.response.data.message || err.message}
        </Center>
      </Box>
    )
  }

  return (
    <>
      {isLoggedIn && (
        <Flex justifyContent="end" mb={3}>
          <Button leftIcon={<FaPlus />} colorScheme="themeHelper" onClick={onCreateChannelPressed}>
            Create channel
          </Button>
        </Flex>
      )}
      <VStack spacing={6} align="stretch">
        {channels
          ?.sort((a, b) => b.createdAt - a.createdAt) // desc
          .map((channel) => (
            <ChannelPreview key={channel.id} channel={channel} onJoinPressed={onJoinPressed} isSendLoading={mutation.isLoading} />
          ))}
      </VStack>
    </>
  )
}
