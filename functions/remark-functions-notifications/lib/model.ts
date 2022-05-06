import { Resource } from '@azure/cosmos'
import { CreateNotificationView, NotificationModel } from '@triszt4n/remark-types'
import validator from 'validator'

export type NotificationResource = NotificationModel & Resource

export const validateInput = ({ messageTitle, messageBody, userId }: CreateNotificationView): boolean => {
  return [validator.isLength(messageTitle, { min: 1, max: 120 }), validator.isLength(messageBody, { min: 1, max: 1000 })].every(Boolean)
}
