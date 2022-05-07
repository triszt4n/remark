import { Box, HStack, Icon, VStack } from '@chakra-ui/react'
import { NotificationView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { RemarkUIRenderer } from '../../../assets/remark-ui-renderer'
import { toRelativeDateString } from '../../../util/core-util-functions'

type Props = {
  notif: NotificationView
}

export const NotificationItem: FC<Props> = ({ notif: { messageTitle, messageBody, createdAt } }) => {
  return (
    <VStack alignItems="stretch">
      <HStack flexWrap="wrap" justifyContent="space-between">
        <Box fontWeight={700}>{messageTitle}</Box>
        <HStack fontSize="xs" flex={1} justifyContent="end">
          <Box>{toRelativeDateString(createdAt)}</Box>
          <Icon as={FaRegPaperPlane} />
        </HStack>
      </HStack>
      <Box fontSize="sm">
        <ReactMarkdown components={RemarkUIRenderer()} children={messageBody} skipHtml />
      </Box>
    </VStack>
  )
}
