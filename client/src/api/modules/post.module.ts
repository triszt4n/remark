import { CommentView, CreatePostView, PostModel, PostPartialView, PostView, UpdatePostView } from '@triszt4n/remark-types'
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
    const response = await axios.get<PostPartialView[]>(`/posts/posts/user/${id}`)
    return response.data
  }

  async createPost(postData: CreatePostView) {
    const response = await axios.post<PostModel & { id: string }>(`/posts/posts`, postData)
    return response
  }

  async updatePost(id: string, postData: UpdatePostView) {
    const response = await axios.patch<PostModel & { id: string }>(`/posts/posts/${id}`, postData)
    return response
  }

  async deletePost(id: string) {
    const response = await axios.delete<PostModel & { id: string }>(`/posts/posts/${id}`)
    return response
  }
}

export const postModule = new PostModule()
