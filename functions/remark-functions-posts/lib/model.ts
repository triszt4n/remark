import { Resource } from '@azure/cosmos'
import { PostModel } from '@triszt4n/remark-types'

export type PostResource = PostModel & Resource
