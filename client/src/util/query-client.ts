import axios from 'axios'
import Cookies from 'js-cookie'
import { QueryClient } from 'react-query'
import { CookieKeys } from '../api/contexts/CookieKeys'
import { API_HOST } from './environment'

export const initAxios = () => {
  axios.defaults.baseURL = API_HOST
  axios.interceptors.request.use((config) => {
    const token = Cookies.get(CookieKeys.REMARK_JWT_TOKEN)
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  })
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
