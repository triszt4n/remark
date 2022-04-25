import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react'
import { CommentView } from '@triszt4n/remark-types'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { FC } from 'react'
import { FaEdit, FaEllipsisV, FaTrashAlt } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import { commentModule } from '../../../../api/modules/comment.module'
import { RLink } from '../../../../components/commons/RLink'
import { VoteButtons } from '../../../../components/voting/VoteButtons'
import { ellipsifyLongText, toDateTimeString, toRelativeDateString } from '../../../../util/core-util-functions'
import { queryClient } from '../../../../util/query-client'

type Props = {
  comment: CommentView
}

export const CommentItem: FC<Props> = ({ comment }) => {
  const { publisher: user, createdAt, rawMarkdown, voteCount, amIPublisher, myVote } = comment
  const navigate = useNavigate()

  const onUpvotePressed = () => {}

  const onDownvotePressed = () => {}

  const onEditPressed = () => {
    navigate(`comments/${comment.id}/edit`)
  }

  const onDeletePressed = async () => {
    const response = await commentModule.deleteComment(comment.id)
    if (response.status >= 200 && response.status < 300) {
      queryClient.invalidateQueries(['postComments', comment.parentPostId])
    } else {
      navigate(`/error`, {
        state: {
          title: 'Error occured when deleting comment',
          messages: [JSON.stringify(response.data, null, 2), `${response.status} ${response.statusText}`]
        }
      })
    }
  }

  return (
    <Box as="article">
      <HStack spacing={2} fontSize={{ base: 'xs', sm: 'sm' }} mb={1}>
        <Avatar
          name={`${comment.publisher.firstName} ${user.lastName}`}
          src={user.imageUrl}
          size={useBreakpointValue({ base: 'xs', sm: 'sm' })}
        />
        <RLink to={`/u/${user.username}`} wordBreak="break-all">
          {ellipsifyLongText(user.username, useBreakpointValue({ base: 24, md: 40 }))}
        </RLink>
        <Box>·</Box>
        <Tooltip hasArrow placement="top" label={toDateTimeString(createdAt)}>
          <time dateTime={new Date(createdAt * 1000).toISOString()}>{toRelativeDateString(createdAt)}</time>
        </Tooltip>
        <Spacer />
        {amIPublisher && (
          <Menu>
            <MenuButton as={IconButton} size="sm" aria-label="Options" icon={<FaEllipsisV />} variant="outline" colorScheme="theme" />
            <MenuList>
              <MenuItem icon={<FaEdit />} onClick={onEditPressed}>
                Edit
              </MenuItem>
              <MenuItem icon={<FaTrashAlt />} onClick={onDeletePressed}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
      <Box borderLeftWidth="0.2rem" overflow="auto" ml={{ base: '0.6rem', sm: '0.9rem' }} pl={{ base: '0.7rem', sm: '1.4rem' }}>
        <ReactMarkdown components={ChakraUIRenderer()} children={rawMarkdown} skipHtml />
        <HStack spacing={2} my={2}>
          <VoteButtons voteCount={voteCount} onUpvotePressed={onUpvotePressed} onDownvotePressed={onDownvotePressed} myVote={myVote} />
        </HStack>
      </Box>
    </Box>
  )
}
