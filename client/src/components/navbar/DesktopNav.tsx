import { Box, Flex, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NAV_ITEMS } from '../../util/nav-items'

const DesktopNav: React.FC = () => {
  const linkColor = useColorModeValue('black', 'white')
  const currentLinkColor = useColorModeValue('theme.500', 'theme.300')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Stack direction="row" spacing={6}>
      {NAV_ITEMS.map((item) => (
        <Flex
          flexDir="column"
          alignItems="center"
          key={item.label}
          as={Link}
          to={item.path}
          p={1}
          display="block"
          position="relative"
          overflow="hidden"
          _hover={{
            _after: { transform: 'translate3d(0, 0, 0)', opacity: 1 }
          }}
          _after={{
            content: `''`,
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            opacity: pathname === item.path ? 1 : 0,
            height: '0.2rem',
            backgroundColor: currentLinkColor,
            transform: pathname === item.path ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
            transition: 'opacity .3s, transform .3s'
          }}
        >
          <Flex fontSize="sm" justifyContent="center">
            <item.icon size="1.5rem" />
          </Flex>
          <Box fontSize="sm">{item.label}</Box>
        </Flex>
      ))}
    </Stack>
  )
}

export default DesktopNav
