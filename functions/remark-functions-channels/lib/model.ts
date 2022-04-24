import { Resource } from '@azure/cosmos'
import { ChannelJoinModel, ChannelModel, UpdateChannelView, UserModel } from '@triszt4n/remark-types'
import validator from 'validator'

export type ChannelResource = ChannelModel & Resource
export type ChannelJoinResource = ChannelJoinModel & Resource
export type UserResource = UserModel & Resource

export const validateInput = ({ uriName, title, descRawMarkdown }: UpdateChannelView): boolean => {
  return [
    validator.isLength(uriName, { min: 3, max: 32 }),
    validator.isLength(title, { min: 3, max: 64 }),
    validator.isLength(descRawMarkdown, { min: 0, max: 1000 })
  ].every(Boolean)
}
