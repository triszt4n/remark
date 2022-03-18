import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { initAxios, queryClient } from './util/query-client'
import customTheme from './assets/theme'

initAxios()

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
