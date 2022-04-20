import axios from 'axios'

class PostModule {
  async fetchPosts() {
    const response = await axios.get<string>(`/posts/posts`)
    return response.data
  }
}

export const postModule = new PostModule()
