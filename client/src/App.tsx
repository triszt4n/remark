import { Box, Button, ChakraProvider, Code, Grid, Text, VStack } from '@chakra-ui/react'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import * as React from 'react'
import customTheme from './assets/theme'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Logo } from './Logo'

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo height="20rem" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Button colorScheme="theme">Learn Chakra</Button>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
