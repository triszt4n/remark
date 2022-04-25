import { Resource } from '@azure/cosmos'
import { CommentModel, UpdateCommentView } from '@triszt4n/remark-types'
import validator from 'validator'

export type CommentResource = CommentModel & Resource

export const validateInput = ({ rawMarkdown }: UpdateCommentView): boolean => {
  return [validator.isLength(rawMarkdown, { min: 0, max: 500 })].every(Boolean)
}
