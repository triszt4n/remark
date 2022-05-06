import {
  Box,
  Button,
  createIcon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  StackDivider,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import { NotificationView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FaBell, FaTrashAlt } from 'react-icons/fa'
import { NotificationItem } from './NotificationItem'

type Props = {}

const CircleIcon = createIcon({
  displayName: 'CircleIcon',
  viewBox: '0 0 200 200',
  path: <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
})

export const NotifPopover: FC<Props> = ({}) => {
  const dividerColor = useColorModeValue('gray.200', 'gray.600')
  const notifications: NotificationView[] = [
    {
      id: '1',
      messageTitle: 'Chakra is going live',
      messageBody: 'Chakra is going live, make it a big hit with us!',
      createdAt: 1651707100000,
      userId: 'asd',
      isSent: true
    }
  ]
  const onTriggerPressed = () => {
    // todo: update context, tell the context that the notifications not read should be read
  }

  return (
    <Popover placement="bottom-end" closeOnBlur={true}>
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            size="md"
            fontSize={{ base: 'xl', md: '2xl' }}
            variant="ghost"
            onClick={onTriggerPressed}
            icon={<FaBell />}
            aria-label="Notifications popup"
          />
          <CircleIcon position="absolute" right={0.5} top={0.5} color="theme.400" />
        </Box>
      </PopoverTrigger>
      <PopoverContent maxHeight="80vh">
        <PopoverHeader fontWeight={700}>Notifications</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody overflowY="auto" py={3}>
          <VStack alignItems="stretch" spacing={3} divider={<StackDivider borderColor={dividerColor} />}>
            {notifications.map((notif) => (
              <NotificationItem key={notif.id} notif={notif} />
            ))}
          </VStack>
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="end">
          <Button colorScheme="themeHelper" size="sm" variant="outline" leftIcon={<FaTrashAlt />}>
            Clear all
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
