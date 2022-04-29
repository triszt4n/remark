import { Box, Button, Flex, HStack, Link as ChakraLink, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react'
import { PostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FaChevronDown, FaComments, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { postModule } from '../../../api/modules/post.module'
import { queryClient } from '../../../util/query-client'

type Props = {
  post: PostView
}

export const ActionsSection: FC<Props> = ({ post }) => {
  const navigate = useNavigate()
  const toast = useToast()
  const onEditPressed = () => {
    navigate('./edit', { state: { post } })
  }

  const mutation = useMutation(postModule.deletePost, {
    onSuccess: () => {
      navigate(`/channels/${post.channel.id}`)
      queryClient.invalidateQueries(['channelPosts', post.channel.id])
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at deletePost', err.toJSON())
      toast({
        title: 'Error occured when deleting post. Try again later.',
        description: `${err.response.status} ${err.message}`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onDeletePressed = () => {
    if (confirm('Are you sure, you want to delete this post?')) mutation.mutate(post.id)
  }

  return (
    <HStack>
      <ChakraLink href="#comments" _hover={{ textDecoration: 'none' }}>
        <Button leftIcon={<FaComments />} variant="ghost" colorScheme="theme">
          Comments
        </Button>
      </ChakraLink>
      <Flex flex={1} borderTopWidth="2px" />
      <Box>
        {(post.amIPublisher || post.channel.amIModerator || post.channel.amIOwner) && (
          <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />} variant="ghost" colorScheme="theme">
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FaEdit />} onClick={onEditPressed}>
                Edit post
              </MenuItem>
              <MenuItem icon={<FaTrashAlt />} onClick={onDeletePressed}>
                Delete post
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </HStack>
  )
}
