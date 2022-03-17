import { Box, Button, Flex, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NAV_ITEMS } from '../../util/nav-items'

const DesktopNav: FC = () => {
  const linkColor = useColorModeValue('black', 'white')
  const currentLinkColor = useColorModeValue('theme.500', 'theme.300')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((item) => (
        <Button flexDir="column" alignItems="center" key={item.label} as={Link} to={item.path} px={1} py={6} variant="ghost">
          <Flex fontSize="sm" justifyContent="center">
            <item.icon size="1.5rem" />
          </Flex>
          <Box fontSize="sm">{item.label}</Box>
        </Button>
      ))}
    </Stack>
  )
}

export default DesktopNav
