import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
  useToast,
  VStack
} from '@chakra-ui/react'
import { ChannelView } from '@triszt4n/remark-types'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { FC } from 'react'
import { FaChevronDown, FaEdit, FaTrashAlt, FaUserPlus } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { channelModule } from '../../../api/modules/channel.module'
import { toDateString, toReadableNumber } from '../../../util/core-util-functions'
import { AddModeratorModal } from './AddModeratorModal'
import { ModeratorsSection } from './moderator/ModeratorsSection'

type Props = {
  channelId: string
  isLoading: boolean
  channel: ChannelView | undefined
}

export const AboutTab: FC<Props> = ({ channelId, isLoading, channel }) => {
  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen, onOpen: onModeratorAddPressed, onClose } = useDisclosure()

  const mutation = useMutation(channelModule.deleteChannel, {
    onMutate: () => {
      toast({
        title: 'Action started',
        description: `Deleting channel is in progess, please wait.`,
        status: 'info',
        isClosable: true,
        duration: 10000
      })
    },
    onSuccess: () => {
      toast({
        title: 'Action successfully done',
        description: `Deleting channel was successful! Redirecting to home page.`,
        status: 'success',
        isClosable: true,
        duration: 3000
      })
      setTimeout(() => navigate('/'), 2000)
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at deleteChannel', err.toJSON())
      toast({
        title: 'Error occured when deleting channel',
        description: `${err.response.status} ${err.response.data.message} Try again later.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onEditPressed = () => {
    navigate('edit', { state: { channel } })
  }
  const onDeletePressed = () => {
    if (confirm('Are you sure, you want to delete this channel?')) mutation.mutate(channelId)
  }

  if (isLoading) {
    return (
      <>
        <Flex flexDir={{ base: 'column', md: 'row' }} mb={2}>
          <Stat borderWidth="1px" borderRadius="lg" p={4} flex={1}>
            <StatLabel>Channel</StatLabel>
            <Skeleton height="2rem" width="80%" />
            <Skeleton height="1rem" width="70%" mt={2} />
          </Stat>
          <Stat borderWidth="1px" borderRadius="lg" p={4} flex={1} mt={{ base: 2, md: 0 }} ml={{ base: 0, md: 2 }}>
            <StatLabel>Statistics</StatLabel>
            <Skeleton height="2rem" width="80%" />
            <Skeleton height="1rem" width="70%" mt={2} />
          </Stat>
        </Flex>
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Text fontSize="sm">Description</Text>
          <Skeleton height="2rem" width="60%" mt={4} />
          <Skeleton height="1rem" width="100%" mt={2} />
          <Skeleton height="1rem" width="70%" mt={2} />
          <Skeleton height="1rem" width="100%" mt={4} />
          <Skeleton height="1rem" width="30%" mt={2} />
        </Box>
      </>
    )
  }

  return (
    <VStack spacing={14} align="stretch">
      <Flex flexDir={{ base: 'column-reverse', sm: 'row' }}>
        <Stat flex={1}>
          <StatLabel>Channel</StatLabel>
          <StatNumber>{channel!!.title}</StatNumber>
          <StatHelpText>channel founded {toDateString(channel!!.createdAt)}</StatHelpText>
        </Stat>
        <Flex justifyContent="end" ml={2}>
          {(channel!!.amIModerator || channel!!.amIOwner) && (
            <Menu>
              <MenuButton as={Button} rightIcon={<FaChevronDown />} colorScheme="theme">
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FaEdit />} onClick={onEditPressed}>
                  Edit channel
                </MenuItem>
                {channel!!.amIOwner && (
                  <MenuItem icon={<FaUserPlus />} onClick={onModeratorAddPressed}>
                    Add moderator
                  </MenuItem>
                )}
                <MenuDivider />
                <MenuItem icon={<FaTrashAlt />} onClick={onDeletePressed}>
                  Delete channel
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
      <Stat mt={{ base: 2, md: 0 }} ml={{ base: 0, md: 2 }}>
        <StatLabel>Statistics</StatLabel>
        <StatNumber>{toReadableNumber(channel!!.postsCount)} posts in channel</StatNumber>
        <StatHelpText>{toReadableNumber(channel!!.joinCount)} users joined</StatHelpText>
      </Stat>
      <Box>
        <Text fontSize="sm">Description</Text>
        <ReactMarkdown components={ChakraUIRenderer()} children={channel!!.descRawMarkdown} skipHtml />
      </Box>
      <Box>
        <ModeratorsSection channelId={channelId} />
      </Box>
      <AddModeratorModal channel={channel!!} isOpen={isOpen} onClose={onClose} />
    </VStack>
  )
}
