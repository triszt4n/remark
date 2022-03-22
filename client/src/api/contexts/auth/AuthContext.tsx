import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { createContext, FC, useEffect, useState } from 'react'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { User } from '../../models/user.model'

const CookieKeys = {
  ACCESS_TOKEN: 'gaccesstoken',
  REFRESH_TOKEN: 'grefreshtoken'
}

export type AuthContextType = {
  isLoggedIn: boolean
  userToken: string | undefined
  user: User | undefined
  onSuccess: (response: GoogleLoginResponseOffline | GoogleLoginResponse) => void
  onFailure: (response: GoogleLoginResponseOffline | GoogleLoginResponse) => void
  logout: () => void
  updateUser: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: typeof Cookies.get(CookieKeys.ACCESS_TOKEN) !== 'undefined',
  userToken: Cookies.get(CookieKeys.ACCESS_TOKEN),
  user: undefined,
  onSuccess: () => {},
  onFailure: () => {},
  logout: () => {},
  updateUser: () => {}
})

export const AuthProvider: FC = ({ children }) => {
  const toast = useToast()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(typeof Cookies.get(CookieKeys.ACCESS_TOKEN) !== 'undefined')
  const [userToken, setUserToken] = useState<string | undefined>(Cookies.get(CookieKeys.ACCESS_TOKEN))
  const [user, setUser] = useState<User>()

  const onSuccess = (response: GoogleLoginResponseOffline | GoogleLoginResponse) => {
    const authRes = (response as GoogleLoginResponse).getAuthResponse()
    console.log(response)
    Cookies.set(CookieKeys.ACCESS_TOKEN, authRes.access_token)
    setUserToken(undefined)
    setIsLoggedIn(false)
    setUser(undefined)
    navigate('/')
  }

  const onFailure = (response: GoogleLoginResponseOffline | GoogleLoginResponse) => {
    toast({
      title: 'Authentication error',
      description: 'There was an error while authenticating you at Google!',
      status: 'error',
      duration: 5000,
      isClosable: true
    })
  }

  const logout = () => {
    Cookies.remove(CookieKeys.ACCESS_TOKEN)
    setUserToken(undefined)
    setIsLoggedIn(false)
    setUser(undefined)
    navigate('/')
  }

  const updateUser = () => {
    if (!isLoggedIn) return

    axios
      .get<User>('/users/users/profile')
      .then((res) => {
        if (typeof res.data !== 'object') logout()
        setUser(res.data)
      })
      .catch(() => {
        toast({
          title: 'Authentication error',
          description: 'You need to log in again.',
          status: 'error',
          duration: 5000,
          isClosable: true
        })
        logout()
      })
  }

  useEffect(() => {
    updateUser()
  }, [isLoggedIn])

  return (
    <AuthContext.Provider value={{ isLoggedIn, userToken, user, onSuccess, onFailure, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
