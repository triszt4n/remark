import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { createContext, FC, useState } from 'react'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { User } from '../../models/user.model'
import { CookieKeys } from '../CookieKeys'

export type AuthContextType = {
  isLoggedIn: boolean
  onLoginSuccess: (response: GoogleLoginResponseOffline | GoogleLoginResponse) => void
  onLoginFailure: (response: GoogleLoginResponseOffline | GoogleLoginResponse) => void
  onLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  onLoginSuccess: () => {},
  onLoginFailure: () => {},
  onLogout: () => {}
})

export const AuthProvider: FC = ({ children }) => {
  const toast = useToast()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(typeof Cookies.get(CookieKeys.REMARK_JWT_TOKEN) !== 'undefined')

  const onLoginSuccess = async (response: GoogleLoginResponseOffline | GoogleLoginResponse) => {
    const { accessToken } = response as GoogleLoginResponse

    const res = await axios.post<{ user: User; jwt: string }>(`/users/login`, { accessToken })
    const { jwt } = res.data

    Cookies.set(CookieKeys.REMARK_JWT_TOKEN, jwt, { expires: 2 })
    setIsLoggedIn(true)
    navigate('/profile')
  }

  const onLoginFailure = (response: GoogleLoginResponseOffline | GoogleLoginResponse) => {
    toast({
      title: 'Authentication error',
      description: 'There was an error while authenticating you at Google!',
      status: 'error',
      duration: 5000,
      isClosable: true
    })
  }

  const onLogout = () => {
    Cookies.remove(CookieKeys.REMARK_JWT_TOKEN)
    setIsLoggedIn(false)
    navigate('/')
  }

  return <AuthContext.Provider value={{ isLoggedIn, onLoginSuccess, onLoginFailure, onLogout }}>{children}</AuthContext.Provider>
}
