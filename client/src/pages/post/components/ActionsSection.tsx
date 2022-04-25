import { Button, Flex, HStack, Link as ChakraLink, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { PostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FaChevronDown, FaComments, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { postModule } from '../../../api/modules/post.module'

type Props = {
  post: PostView
}

export const ActionsSection: FC<Props> = ({ post }) => {
  const navigate = useNavigate()
  const onEditPressed = () => {
    navigate('edit')
  }
  const onDeletePressed = async () => {
    const response = await postModule.deletePost(post.id)
    if (response.status >= 200 && response.status < 300) {
      navigate(`/channels/${post.channel.id}`)
    } else {
      navigate(`/error`, {
        state: {
          title: 'Error occured when deleting post',
          messages: [JSON.stringify(response.data, null, 2), `${response.status} ${response.statusText}`]
        }
      })
    }
  }

  return (
    <HStack>
      <ChakraLink href="#comments" _hover={{ textDecoration: 'none' }}>
        <Button leftIcon={<FaComments />} variant="ghost" colorScheme="theme">
          Comments
        </Button>
      </ChakraLink>
      <Flex flex={1} borderTopWidth="2px" />
      {post.amIPublisher && (
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
    </HStack>
  )
}
