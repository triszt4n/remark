import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useBreakpointValue,
  VStack
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { FaAddressCard, FaAt, FaChevronDown, FaEdit, FaRegUserCircle, FaSignOutAlt } from 'react-icons/fa'
import { User } from '../../../api/models/user.model'

type Props = {
  user: User
  profileOptions?: {
    onLogoutPressed: () => void
    onUsernameEditPressed: () => void
  }
}

export const ProfileDetails: FC<Props> = ({ user, profileOptions }) => {
  const { onLogoutPressed, onUsernameEditPressed } = profileOptions || {}
  const onChangeProfileImagePressed = () => {}

  return (
    <Box>
      <HStack flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={5}>
        <HStack flexWrap="wrap">
          <Avatar size={useBreakpointValue({ base: 'lg', md: 'xl' })} name={`${user.firstName} ${user.lastName}`} src={user.imageUrl} />
          <HStack>
            <Box fontSize="4xl" fontWeight={700} wordBreak="break-all">
              {user.username}
            </Box>
            {profileOptions && (
              <Tooltip label="Change username">
                <IconButton
                  size="xs"
                  alignSelf="flex-start"
                  aria-label="Change username"
                  onClick={onUsernameEditPressed}
                  icon={<FaEdit />}
                  colorScheme="themeHelper"
                />
              </Tooltip>
            )}
          </HStack>
        </HStack>
        {profileOptions && (
          <HStack flex={1} justifyContent="end">
            <Menu>
              <MenuButton as={Button} colorScheme="themeHelper" rightIcon={<FaChevronDown />}>
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FaRegUserCircle />} onClick={onChangeProfileImagePressed}>
                  Change profile image
                </MenuItem>
                <MenuItem icon={<FaSignOutAlt />} onClick={onLogoutPressed}>
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        )}
      </HStack>
      <VStack alignItems="start">
        <HStack>
          <FaAddressCard />
          <Box>
            {user.firstName} {user.lastName}
          </Box>
        </HStack>
        <HStack>
          <FaAt />
          <Box>{user.email}</Box>
        </HStack>
      </VStack>
    </Box>
  )
}
