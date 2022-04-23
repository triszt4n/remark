import { CommentView, CreatePostView, PostPartialView, PostView, UpdatePostView } from '@triszt4n/remark-types'
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

  async fetchCreatedPostsOfUser(id: string): Promise<PostPartialView[]> {
    const response = await axios.get<PostPartialView[]>(`/posts/posts/user/${id}/posts`)
    return response.data
  }

  async createPost(postData: CreatePostView) {
    const response = await axios.post<CreatePostView>(`/posts/posts`, postData)
    return response
  }

  async updatePost(id: string, postData: UpdatePostView) {
    const response = await axios.patch<UpdatePostView>(`/posts/posts/${id}`, postData)
    return response
  }
}

export const postModule = new PostModule()
