import { Button, Flex, HStack, Link as ChakraLink, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { PostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FaChevronDown, FaComments, FaEdit, FaTrashAlt } from 'react-icons/fa'

type Props = {
  post: PostView
}

export const ActionsSection: FC<Props> = ({ post }) => {
  const onEditPressed = () => {}
  const onDeletePressed = () => {}

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
