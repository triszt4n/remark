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
  isLoggedIn: false,
  userToken: undefined,
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

  useEffect(() => {
    updateUser()
  }, [isLoggedIn])

  const onLoginSuccess = (response: GoogleLoginResponseOffline | GoogleLoginResponse) => {
    const authRes = response as GoogleLoginResponse
    const { accessToken } = authRes

    axios
      .post(`/users/jwt`, { accessToken })
      .then((response) => {
        const user = response.data.user as User
        const jwtToken = response.data.jwt as string

        console.log(user)
        Cookies.set(CookieKeys.REMARK_JWT_TOKEN, jwtToken, { expires: 2 })
        setUserToken(jwtToken)
        setIsLoggedIn(true)
        setUser(user)
        navigate('/profile')
      })
      .catch((error) => {
        console.error(error)
        navigate("/error?messages=Couldn't create token for user logged in!,Please try again or report it!")
      })
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
        // todo: return to this user update

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
        setUser({
          firstName: 'Random',
          lastName: 'User',
          email: 'random@random.com',
          username: 'random@random.com',
          id: 'random_id'
        })
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

  return (
    <AuthContext.Provider value={{ isLoggedIn, userToken, user, onLoginSuccess, onLoginFailure, onLogout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
