import axios from 'axios'
import { User } from '../models/user.model'

class UserModule {
  async fetchCurrentUser() {
    const response = await axios.get<User>('/users/profile')
    return response.data
  }
}

export const userModule = new UserModule()
