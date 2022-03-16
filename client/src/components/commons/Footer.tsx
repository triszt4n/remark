import { Box, Container, Flex, Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { RLogoSimple } from '../../assets/RLogoSimple'
import { NAV_ITEMS } from '../../util/nav-items'

export const Footer: React.FC = () => (
  <Box as="footer">
    <Container py={8} as={Flex} justifyContent="space-between" direction={{ base: 'column', sm: 'row' }} maxW="6xl">
      <Flex mb={{ base: 4, sm: 0 }} justifyContent={{ base: 'center', sm: 'flex-start' }}>
        <Box height="3.25rem" width="3.25rem" mr={4}>
          <RLogoSimple />
        </Box>
        <Flex direction="column">
          <Text fontWeight={700}>This is re:mark.</Text>
          <Stack direction="row" spacing={{ base: 2, sm: 3, md: 4 }}>
            {NAV_ITEMS.filter((item) => item.showInFooter).map((item) => (
              <ChakraLink key={item.path} as={Link} to={item.path}>
                {item.label}
              </ChakraLink>
            ))}
          </Stack>
        </Flex>
      </Flex>
      <Flex direction="column" justifyContent={{ base: 'center', sm: 'flex-end' }}>
        <Text mt={2} textAlign={{ base: 'center', sm: 'right' }}>
          &copy; {new Date().getFullYear()} • Trisztán Piller
        </Text>
      </Flex>
    </Container>
  </Box>
)
