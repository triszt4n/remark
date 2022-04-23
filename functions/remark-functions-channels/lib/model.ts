import { Resource } from '@azure/cosmos'
import { ChannelJoinModel, ChannelModel, UserModel } from '@triszt4n/remark-types'

export type ChannelResource = ChannelModel & Resource
export type ChannelJoinResource = ChannelJoinModel & Resource
export type UserResource = UserModel & Resource
