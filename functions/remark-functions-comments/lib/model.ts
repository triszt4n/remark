import { Resource } from '@azure/cosmos'
import { ChannelJoinModel, ChannelModel, CommentModel, PostModel, UpdateCommentView } from '@triszt4n/remark-types'
import validator from 'validator'

export type CommentResource = CommentModel & Resource
export type ChannelResource = ChannelModel & Resource
export type PostResource = PostModel & Resource
export type ChannelJoinResource = ChannelJoinModel & Resource

export const validateInput = ({ rawMarkdown }: UpdateCommentView): boolean => {
  return [validator.isLength(rawMarkdown, { min: 0, max: 500 })].every(Boolean)
}