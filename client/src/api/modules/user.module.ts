import { ChannelPartialView, PostPartialView, UpdateUserView, UserView } from '@triszt4n/remark-types'
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

  async updateUser(id: string, newData: UpdateUserView) {
    return axios.patch<UserView>(`/users/users/${id}`, newData)
  }

  async fetchJoinedChannelsOfUser(id: string): Promise<ChannelPartialView[]> {
    const response = await axios.get<ChannelPartialView[]>(`/channels/user/${id}/joins`)
    return response.data
  }

  async fetchCreatedPostsOfUser(id: string): Promise<PostPartialView[]> {
    const response = await axios.get<PostPartialView[]>(`/posts/user/${id}/posts`)
    return response.data
  }
}

export const userModule = new UserModule()
