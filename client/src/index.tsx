import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './api/contexts/auth/AuthContext'
import { CookieConsentProvider } from './api/contexts/cookie-consent/CookieConsentContext'
import { NotificationsProvider } from './api/contexts/notifications/NotificationsContext'
import { App } from './App'
import customTheme from './assets/theme'
import { GOOGLE_AUTH_CLIENT_ID } from './util/environment'
import { initAxios, queryClient } from './util/query-client'

initAxios()
const el = document.getElementById('root')
if (el === null) throw new Error('Root container missing in index.html')

const root = ReactDOM.createRoot(el)
root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={customTheme}>
      <CookieConsentProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <NotificationsProvider>
              <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
                <AuthProvider>
                  <App />
                  <ReactQueryDevtools />
                </AuthProvider>
              </GoogleOAuthProvider>
            </NotificationsProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </CookieConsentProvider>
    </ChakraProvider>
  </React.StrictMode>
)
