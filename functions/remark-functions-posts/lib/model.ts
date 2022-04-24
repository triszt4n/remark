import { Resource } from '@azure/cosmos'
import { ChannelJoinModel, ChannelModel, CommentModel, PostModel, UpdatePostView, UserModel } from '@triszt4n/remark-types'
import validator from 'validator'

export type PostResource = PostModel & Resource
export type ChannelResource = ChannelModel & Resource
export type ChannelJoinResource = ChannelJoinModel & Resource
export type UserResource = UserModel & Resource
export type CommentResource = CommentModel & Resource

export const validateInput = ({ title, rawMarkdown }: UpdatePostView): boolean => {
  return [validator.isLength(title, { min: 3, max: 64 }), validator.isLength(rawMarkdown, { min: 0, max: 1000 })].every(Boolean)
}
