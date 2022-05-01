import { UpdateUserImageView, UpdateUserView, UserView } from '@triszt4n/remark-types'
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

  async updateUser(userData: UpdateUserView) {
    return axios.patch<UserView>(`/users/profile`, userData)
  }

  async uploadProfileImage(userData: UpdateUserImageView) {
    const { imageFile } = userData
    const formData = new FormData()
    formData.append('file', imageFile)
    return axios.post<UserView>(`/users/profile/image?filename=${imageFile.name}`, formData)
  }

  async loginUser(accessToken: string) {
    return axios.post<{ user: UserView; jwt: string }>(`/users/login`, { accessToken })
  }
}

export const userModule = new UserModule()
