import { Box, Button, ChakraProvider, Code, Grid, Text, VStack } from '@chakra-ui/react'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import customTheme from './assets/theme'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Logo } from './Logo'
import { API_HOST } from './util/environment'
import { generateName } from './util/name-generator'

export const App = () => {
  const [message, setMessage] = useState<string>('')
  useEffect(() => {
    axios.get<string>(`${API_HOST}/posts?name=${generateName()}`).then((response) => {
      setMessage(response.data)
    })
  }, [])

  return (
    <ChakraProvider theme={customTheme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo height="16rem" />
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Text>From API: {message}</Text>
            <Button colorScheme="theme">Learn Chakra</Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
