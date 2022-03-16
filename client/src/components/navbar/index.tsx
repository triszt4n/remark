import { Box, Collapse, Flex, IconButton, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FaHamburger } from 'react-icons/fa'
import { RLogo } from '../../assets/RLogo'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export const Navbar: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box mx="auto" maxW="6xl" w="full" fontFamily="heading">
      <Flex h={{ base: '4rem', md: '6rem' }} w="full" px={4} py={2} align="center">
        <Flex display={{ base: 'flex', md: 'none' }}>
          <IconButton onClick={onToggle} icon={<FaHamburger size="1.5rem" />} variant="ghost" aria-label="Open navigation" />
        </Flex>
        <Flex flex={{ base: 1, md: 0 }} justifyContent="center">
          <RLogo style={{ height: useBreakpointValue({ base: '1.75rem', sm: '2.5rem', md: '3rem' }) }} />
        </Flex>
        <Flex display={{ base: 'none', md: 'flex' }} flex={1} justifyContent="flex-end">
          <DesktopNav />
        </Flex>
        <Flex ml={2}>
          <ColorModeSwitcher />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}
