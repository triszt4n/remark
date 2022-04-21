import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  SkeletonCircle,
  Tooltip,
  useBreakpointValue,
  VStack
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { FaAddressCard, FaAt, FaChevronDown, FaEdit, FaRegUserCircle, FaSignOutAlt } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { User } from '../../../api/models/user.model'
import { userModule } from '../../../api/modules/user.module'
import { JoinedChannelsSection } from './channel/JoinedChannelsSection'
import { CreatedPostsSection } from './post/CreatedPostsSection'

type Props = {
  user: User | undefined
  isLoading: boolean
  error: any
  profileOptions?: {
    onLogoutPressed: () => void
    onUsernameEditPressed: () => void
  }
}

export const ProfileDetails: FC<Props> = ({ user, profileOptions, isLoading, error }) => {
  const { onLogoutPressed, onUsernameEditPressed } = profileOptions || {}
  const onChangeProfileImagePressed = () => {}

  if (isLoading) {
    return (
      <>
        <HStack width="100%" mb={5}>
          <SkeletonCircle size="24" />
          <Skeleton height="2.25rem" width={{ base: '100%', md: '50%' }} />
        </HStack>
        <Skeleton height="1.25rem" width={{ base: '100%', md: '50%' }} mb={2} />
        <Skeleton height="1.25rem" width={{ base: '100%', md: '50%' }} />
      </>
    )
  }

  if (error) {
    console.log('[DEBUG] at ProfilePage: ProfileDetails', error)
    return (
      <Box width="full">
        <Center fontSize="lg">Error fetching user's details! {error.response.statusText}</Center>
      </Box>
    )
  }

  if (!user) {
    console.log('[ERROR] Major error at ProfilePage: no user!')
    return (
      <Box width="full">
        <Center fontSize="lg">Error fetching user's details! Major error. {error.response.statusText}</Center>
      </Box>
    )
  }

  const {
    isLoading: isLoadingChannels,
    data: channels,
    error: errorInChannels
  } = useQuery(['userChannels', user.username], () => userModule.fetchJoinedChannelsOfUser(user.username))

  const {
    isLoading: isLoadingPosts,
    data: posts,
    error: errorInPosts
  } = useQuery(['userPosts', user.username], () => userModule.fetchCreatedPostsOfUser(user.username))

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
      <VStack align="stretch">
        <Box>
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
        </Box>
        <JoinedChannelsSection channels={channels} isLoading={isLoadingChannels} error={errorInChannels} />
        <CreatedPostsSection posts={posts} isLoading={isLoadingPosts} error={errorInPosts} />
      </VStack>
    </Box>
  )
}
