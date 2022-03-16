import { HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '../../util/nav-items'

const MobileNav: React.FC = () => (
  <Stack display={{ md: 'none' }} fontWeight={700} fontSize="xl" ml={6} mb={6}>
    {NAV_ITEMS.map((item) => (
      <HStack key={item.label} as={Link} to={item.path}>
        <item.icon />
        <Text textAlign="center">{item.label}</Text>
      </HStack>
    ))}
  </Stack>
)

export default MobileNav
