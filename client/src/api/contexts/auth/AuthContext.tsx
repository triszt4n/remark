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
  onLoginSuccess: (response: GoogleLoginResponseOffline | GoogleLoginResponse) => void
  onLoginFailure: (response: GoogleLoginResponseOffline | GoogleLoginResponse) => void
  onLogoutSuccess: () => void
  updateUser: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: typeof Cookies.get(CookieKeys.ACCESS_TOKEN) !== 'undefined',
  userToken: Cookies.get(CookieKeys.ACCESS_TOKEN),
  user: undefined,
  onLoginSuccess: () => {},
  onLoginFailure: () => {},
  onLogoutSuccess: () => {},
  updateUser: () => {}
})

const mockUser: User = {
  firstName: 'Jacob',
  lastName: 'Example',
  username: 'jacob_example',
  id: 0,
  token: 'randomjwttoken'
}

export const AuthProvider: FC = ({ children }) => {
  const toast = useToast()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(typeof Cookies.get(CookieKeys.ACCESS_TOKEN) !== 'undefined')
  const [userToken, setUserToken] = useState<string | undefined>(Cookies.get(CookieKeys.ACCESS_TOKEN))
  const [user, setUser] = useState<User>()

  const onLoginSuccess = (response: GoogleLoginResponseOffline | GoogleLoginResponse) => {
    const authRes = (response as GoogleLoginResponse).getAuthResponse()
    console.log('onLoginSuccess:', response)

    // todo: get user with JWT from backend
    const user = mockUser
    user.token = authRes.access_token

    Cookies.set(CookieKeys.ACCESS_TOKEN, authRes.access_token)
    setUserToken(authRes.access_token) // todo: change for JWT token (user.token)
    setIsLoggedIn(true)
    setUser(user) // todo: change for received user
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
        // if (typeof res.data !== 'object') {
        //   toast({
        //     title: 'Authentication error',
        //     description: 'Authentication server is not functioning well.',
        //     status: 'error',
        //     duration: 5000,
        //     isClosable: true
        //   })
        //   logout()
        // }
        // setUser(res.data)
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
    <AuthContext.Provider value={{ isLoggedIn, userToken, user, onLoginSuccess, onLoginFailure, onLogoutSuccess: logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
