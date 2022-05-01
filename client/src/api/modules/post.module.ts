import {
  CommentView,
  CreatePostView,
  MyVoteType,
  PostModel,
  PostPartialView,
  PostView,
  PostVoteModel,
  UpdatePostImageView,
  UpdatePostView
} from '@triszt4n/remark-types'
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
    return axios.post<PostModel & { id: string }>(`/posts/posts`, postData)
  }

  async updatePost({ id, postData }: { id: string; postData: UpdatePostView }) {
    return axios.patch<PostModel & { id: string }>(`/posts/posts/${id}`, postData)
  }

  async uploadPostImage({ id, postData: { imageFile } }: { id: string; postData: UpdatePostImageView }) {
    const formData = new FormData()
    formData.append('file', imageFile)
    return axios.post<PostModel & { id: string }>(`/posts/posts/${id}/image?filename=${imageFile.name}`, formData)
  }

  async deletePost(id: string) {
    return axios.delete<PostModel & { id: string }>(`/posts/posts/${id}`)
  }

  async votePost({ id, voteType }: { id: string; voteType: MyVoteType }) {
    return axios.post<PostVoteModel & { id: string }>(`/posts/posts/${id}/vote`, { intent: voteType })
  }
}

export const postModule = new PostModule()
