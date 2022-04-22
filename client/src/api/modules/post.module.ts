import { CommentView, PostView } from '@triszt4n/remark-types'
import axios from 'axios'

class PostModule {
  async fetchPost(id: string): Promise<PostView> {
    const response = await axios.get<PostView>(`/posts/posts/${id}`)
    return response.data
  }

  async fetchCommentsOfPost(id: string): Promise<CommentView[]> {
    const response = await axios.get<CommentView[]>(`/posts/posts/${id}/comments`)
    return response.data
  }
}

export const postModule = new PostModule()
