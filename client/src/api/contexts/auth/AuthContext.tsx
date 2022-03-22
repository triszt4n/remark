import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { createContext, FC, useEffect, useState } from 'react'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { User } from '../../models/user.model'

enum CookieKeys {
  REMARK_JWT_TOKEN = 'REMARK_JWT_TOKEN'
}

export type AuthContextType = {
  isLoggedIn: boolean
  userToken: string | undefined
  user: User | undefined
  onLoginSuccess: (response: GoogleLoginResponseOffline | GoogleLoginResponse) => void
  onLoginFailure: (response: GoogleLoginResponseOffline | GoogleLoginResponse) => void
  onLogout: () => void
  updateUser: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: typeof Cookies.get(CookieKeys.REMARK_JWT_TOKEN) !== 'undefined',
  userToken: Cookies.get(CookieKeys.REMARK_JWT_TOKEN),
  user: undefined,
  onLoginSuccess: () => {},
  onLoginFailure: () => {},
  onLogout: () => {},
  updateUser: () => {}
})

export const AuthProvider: FC = ({ children }) => {
  const toast = useToast()
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(typeof Cookies.get(CookieKeys.REMARK_JWT_TOKEN) !== 'undefined')
  const [userToken, setUserToken] = useState<string | undefined>(Cookies.get(CookieKeys.REMARK_JWT_TOKEN))
  const [user, setUser] = useState<User>()

  const onLoginSuccess = (response: GoogleLoginResponseOffline | GoogleLoginResponse) => {
    const authRes = response as GoogleLoginResponse
    const basicProfile = authRes.getBasicProfile()
    const { accessToken } = authRes

    console.log('onLoginSuccess:', authRes)

    // todo: post this up the backend with accessToken
    const user = {
      firstName: basicProfile.getGivenName(),
      lastName: basicProfile.getFamilyName(),
      email: basicProfile.getEmail()
      // username will be an SHA-1 hash of email while the user does not modify
    }

    // todo: get user with JWT from backend
    const jwtToken = 'something'
    const resultUser = {
      ...user,
      username: user.email,
      id: user.email
    }

    Cookies.set(CookieKeys.REMARK_JWT_TOKEN, jwtToken, { expires: 7 })
    setUserToken(jwtToken)
    setIsLoggedIn(true)
    setUser(resultUser)
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
        //   onLogout()
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
        onLogout()
      })
  }

  useEffect(() => {
    updateUser()
  }, [isLoggedIn])

  return (
    <AuthContext.Provider value={{ isLoggedIn, userToken, user, onLoginSuccess, onLoginFailure, onLogout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
