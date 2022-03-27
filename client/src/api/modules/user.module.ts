import axios from 'axios'
import { UpdateUser, User } from '../models/user.model'

class UserModule {
  async fetchCurrentUser() {
    const response = await axios.get<User>('/users/profile')
    return response.data
  }

  async fetchUserByUsername(username: string) {
    const response = await axios.get<User>(`/users/users/username/${username}`)
    return response.data
  }

  async updateUser(id: string, newData: UpdateUser) {
    return axios.patch<User>(`/users/users/${id}`, newData)
  }

  async fetchUsers() {
    const response = await axios.get<User[]>(`/users/users`)
    return response.data
  }
}

export const userModule = new UserModule()
