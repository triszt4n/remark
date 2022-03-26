import axios from 'axios'
import { generateName } from '../../util/name-generator'

class PostModule {
  async fetchPosts() {
    const response = await axios.get<string>(`/posts/posts?name=${generateName()}`)
    return response.data
  }
}

export const postModule = new PostModule()
