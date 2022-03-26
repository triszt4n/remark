import axios from 'axios'
import { generateName } from '../../util/name-generator'

class PostModule {
  async fetchPosts() {
    try {
      const response = await axios.get<string>(`/posts/posts?name=${generateName()}`)
      return response.data
    } catch (error) {
      console.error(`[ERROR] at fetchPosts`, error)
    }
  }

  async fetchUser() {
    try {
      const response = await axios.get<string>(`/users/users/1?name=${generateName()}`)
      return response.data
    } catch (error) {
      console.error(`[ERROR] at fetchUser`, error)
    }
  }
}

export const postModule = new PostModule()
