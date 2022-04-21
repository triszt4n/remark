import axios from 'axios'
import { ChannelPartial } from '../models/channel.model'
import { PostPartial } from '../models/post.model'
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

  async fetchJoinedChannelsOfUser(username: string): Promise<ChannelPartial[]> {
    return [
      { uriName: 'asd', amIJoined: true, id: '123', joinCount: 456, title: 'Cute Kitties' },
      { uriName: 'fgh', amIJoined: false, id: '234', joinCount: 4415123, title: 'Adorable Doggos' }
    ]
  }

  async fetchCreatedPostsOfUser(username: string): Promise<PostPartial[]> {
    return [
      {
        createdAt: 1680460000,
        title: "It is what it's supposed to beasdasd",
        parentChannelUriName: 'asd',
        id: '123',
        voteCount: 456,
        rawMarkdown: '# HIHIHI\n\n* hahaha\n* hohoho\n\nnyeh.\n'
      },
      {
        createdAt: 1680460000,
        title: "It is what it's supposed to beasdasds",
        parentChannelUriName: 'asd',
        id: '123',
        voteCount: -41156,
        rawMarkdown: '# HIHIHI\n\n* hahaha\n* hohoho\n\nnyeh.\n',
        imageUrl:
          'https://images.unsplash.com/photo-1549877452-9c387954fbc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      }
    ]
  }
}

export const userModule = new UserModule()
