import axios from 'axios'
import { QueryClient } from 'react-query'
import { API_HOST } from './environment'

export const initAxios = () => {
  axios.defaults.baseURL = API_HOST
}
export const queryClient = new QueryClient({})
