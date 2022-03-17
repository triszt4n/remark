import axios from 'axios'
import { generateName } from '../../../util/name-generator'

export const feedFunctions = {
  async fetchPosts() {
    const response = await axios.get<string>(`/posts?name=${generateName()}`)
    return response.data
  }
}
