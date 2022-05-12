import { Resource } from '@azure/cosmos'
import { ChannelJoinModel, ChannelModel, PostModel, UpdateChannelView, UserModel } from '@triszt4n/remark-types'
import validator from 'validator'

export type ChannelResource = ChannelModel & Resource
export type ChannelJoinResource = ChannelJoinModel & Resource
export type UserResource = UserModel & Resource
export type PostResource = PostModel & Resource

export const validateInput = (
  update: {
    uriName?: string
  } & UpdateChannelView
): boolean => {
  return [
    update.uriName ? validator.isLength(update.uriName, { min: 3, max: 32 }) : true,
    validator.isLength(update.title, { min: 3, max: 64 }),
    validator.isLength(update.descRawMarkdown, { min: 0, max: 1000 })
  ].every(Boolean)
}
