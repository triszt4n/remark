import { UpdateUserView, UserView } from '@triszt4n/remark-types'
import axios from 'axios'

class UserModule {
  async fetchCurrentUser() {
    const response = await axios.get<UserView>('/users/profile')
    return response.data
  }

  async fetchUserByUsername(username: string) {
    const response = await axios.get<UserView>(`/users/users/username/${username}`)
    return response.data
  }

  async updateUser({ id, userData }: { id: string; userData: UpdateUserView }) {
    return axios.patch<UserView>(`/users/users/${id}`, userData)
  }

  async loginUser(accessToken: string) {
    return await axios.post<{ user: UserView; jwt: string }>(`/users/login`, { accessToken })
  }
}

export const userModule = new UserModule()
