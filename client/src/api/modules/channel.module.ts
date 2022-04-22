import { ChannelView, PostView, UserView } from '@triszt4n/remark-types'
import axios from 'axios'

type ModeratorInfo = { owner: UserView; moderators: UserView[] }

class ChannelModule {
  async fetchModeratorInfoOfChannel(id: string): Promise<ModeratorInfo> {
    const response = await axios.get<ModeratorInfo>(`/channels/channels/${id}/modinfo`)
    return response.data
  }

  async fetchPostsOfChannel(id: string): Promise<PostView[]> {
    const response = await axios.get<PostView[]>(`/channels/channels/${id}/posts`)
    return response.data
  }

  async fetchChannelIdByUriName(uriName: string): Promise<{ id: string }> {
    const response = await axios.get<{ id: string }>(`/channels/channels/uriName/${uriName}`)
    return response.data
  }

  async fetchChannel(id: string): Promise<ChannelView> {
    const response = await axios.get<ChannelView>(`/channels/channels/${id}`)
    return response.data
  }
}

export const channelModule = new ChannelModule()
