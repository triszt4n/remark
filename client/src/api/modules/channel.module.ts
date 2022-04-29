import {
  ChannelJoinModel,
  ChannelModel,
  ChannelPartialView,
  ChannelView,
  CreateChannelView,
  PostView,
  UpdateChannelView,
  UserView
} from '@triszt4n/remark-types'
import axios from 'axios'

type ModeratorInfo = { owner: UserView; moderators: UserView[] }

class ChannelModule {
  async fetchModeratorInfoOfChannel(id: string): Promise<ModeratorInfo> {
    const response = await axios.get<ModeratorInfo>(`/channels/channels/${id}/modinfo`)
    return response.data
  }

  async fetchPostsOfChannel(id: string): Promise<PostView[]> {
    const response = await axios.get<PostView[]>(`/posts/posts/channel/${id}`)
    return response.data
  }

  async fetchChannelIdByUriName(uriName: string): Promise<{ id: string }> {
    const response = await axios.get<{ id: string }>(`/channels/channels/uriName/${uriName}`)
    return response.data
  }

  async fetchJoinedChannelsOfUser(id: string): Promise<ChannelPartialView[]> {
    const response = await axios.get<ChannelPartialView[]>(`/channels/channels/user/${id}/joins`)
    return response.data
  }

  async fetchChannel(id: string): Promise<ChannelView> {
    const response = await axios.get<ChannelView>(`/channels/channels/${id}`)
    return response.data
  }

  async createChannel(channelData: CreateChannelView) {
    const response = await axios.post<ChannelModel & { id: string }>(`/channels/channels`, channelData)
    return response
  }

  async updateChannel({ id, channelData }: { id: string; channelData: UpdateChannelView }) {
    const response = await axios.patch<ChannelModel & { id: string }>(`/channels/channels/${id}`, channelData)
    return response
  }

  async deleteChannel(id: string) {
    const response = await axios.patch<ChannelModel & { id: string }>(`/channels/channels/${id}`)
    return response
  }

  async joinOrLeaveChannel({ id, intent }: { id: string; intent: 'join' | 'leave' }) {
    const response = await axios.post<ChannelJoinModel & { id: string }>(`/channels/channels/${id}/join`, { intent })
    return response
  }

  async addModeratorToChannel({ id, moderatorUsername }: { id: string; moderatorUsername: string }) {
    const response = await axios.post<ChannelJoinModel & { id: string }>(`/channels/channels/${id}/moderator`, {
      moderatorUsername
    })
    return response
  }
}

export const channelModule = new ChannelModule()
