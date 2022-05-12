import { Resource } from '@azure/cosmos'
import {
  ChannelJoinModel,
  ChannelModel,
  CommentModel,
  CommentVoteModel,
  PostModel,
  UpdateCommentView,
  UserModel
} from '@triszt4n/remark-types'
import validator from 'validator'

export type CommentResource = CommentModel & Resource
export type ChannelResource = ChannelModel & Resource
export type PostResource = PostModel & Resource
export type ChannelJoinResource = ChannelJoinModel & Resource
export type CommentVoteResource = CommentVoteModel & Resource
export type UserResource = UserModel & Resource
export type DeletedCommentResource = CommentResource & { isDeleted?: boolean }

export const validateInput = ({ rawMarkdown }: UpdateCommentView): boolean => {
  return [validator.isLength(rawMarkdown, { min: 1, max: 500 })].every(Boolean)
}
