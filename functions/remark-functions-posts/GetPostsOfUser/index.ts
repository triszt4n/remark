import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelInPostView, PostPartialView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryPostsOfUserId, createQueryPostVotesByPostId } from '../lib/dbQueries'
import { ChannelResource, PostResource, PostVoteResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

  // User data from Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  const user = result.isError ? null : (result.userFromJwt as { id: string; username: string; email: string })

  const database = fetchCosmosDatabase()
  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const { resources: posts } = await postsContainer.items.query<PostResource>(createQueryPostsOfUserId(id)).fetchAll()

  // Short circuit if none found, not connecting to containers
  if (posts.length === 0) {
    context.res = {
      body: []
    }
    return
  }

  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const postVotesContainer = fetchCosmosContainer(database, 'PostVotes')

  const returnables = await Promise.all(
    posts.map(async (post) => {
      // todo: optimize by parallelizing
      const { resources: postVotes } = await postVotesContainer.items
        .query<PostVoteResource>(createQueryPostVotesByPostId(post.id))
        .fetchAll()
      const voteCount = postVotes.reduce((total, { isUpvote }) => (isUpvote ? total + 1 : total - 1), 0)

      const { resource: parentChannel } = await channelsContainer.item(post.parentChannelId, post.parentChannelId).read<ChannelResource>()
      const channel: ChannelInPostView = {
        ...parentChannel,
        amIOwner: user?.id == parentChannel.ownerId,
        amIModerator: user ? parentChannel.moderatorIds.includes(user?.id) : false
      }

      const returnable: PostPartialView = {
        ...post,
        channel,
        voteCount
      }
      return returnable
    })
  )

  context.res = {
    body: returnables
  }
}

export default httpTrigger
