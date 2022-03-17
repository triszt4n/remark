import axios from 'axios'
import Cookies from 'js-cookie'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from './user.model'

const CookieKeys = {
  LOGGED_IN: 'loggedIn'
}

export type AuthContextType = {
  isLoggedIn: boolean
  profile: User | undefined
  login: () => void
  logout: () => void
  updateProfile: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: Cookies.get(CookieKeys.LOGGED_IN) === 'true',
  profile: undefined,
  login: () => {},
  logout: () => {},
  updateProfile: () => {}
})

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Cookies.get(CookieKeys.LOGGED_IN) === 'true')
  const [profile, setProfile] = useState<ProfileDTO>()

  const login = () => {
    location.href = '/control/login'
  }

  const logout = () => {
    location.href = '/control/logout'
  }

  const updateProfile = () => {
    if (isLoggedIn)
      axios
        .get<ProfileDTO>(`${API_BASE_URL}/api/profile`)
        .then((res) => {
          if (typeof res.data !== 'object') logout()
          setProfile(res.data)
        })
        .catch(() => {
          throwError('Újra be kell jelentkezned!', { toast: true, toastStatus: 'warning', toHomePage: true })
          setIsLoggedIn(false)
          setProfile(undefined)
          Cookies.remove(CookieKeys.LOGGED_IN)
        })
  }

  useEffect(() => {
    updateProfile()
  }, [isLoggedIn])

  return <AuthContext.Provider value={{ isLoggedIn, profile, login, logout, updateProfile }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext<AuthContextType>(AuthContext)
}
