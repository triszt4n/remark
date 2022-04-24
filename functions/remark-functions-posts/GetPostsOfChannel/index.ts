import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { readUserFromAuthHeader } from '@triszt4n/remark-auth'
import { ChannelInPostView, MyVoteType, PostView } from '@triszt4n/remark-types'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryPostsOfChannelId, createQueryPostVoteByPostIdAndUserId, createQueryPostVotesByPostId } from '../lib/dbQueries'
import { ChannelResource, PostResource, UserResource } from '../lib/model'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = context.bindingData.id as string

  // User data from Authorization
  const result = readUserFromAuthHeader(req, process.env.JWT_PRIVATE_KEY)
  const user = result.isError ? null : (result.userFromJwt as { id: string; username: string; email: string })

  const database = fetchCosmosDatabase()
  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const { resources: posts } = await postsContainer.items.query<PostResource>(createQueryPostsOfChannelId(id)).fetchAll()

  // Short circuit if none found, not connecting to containers
  if (posts.length === 0) {
    context.res = {
      body: []
    }
    return
  }

  const channelsContainer = fetchCosmosContainer(database, 'Channels')
  const usersContainer = fetchCosmosContainer(database, 'Users')
  const postVotesContainer = fetchCosmosContainer(database, 'PostVotes')

  const returnables = await Promise.all(
    posts.map(async (post) => {
      // todo: optimize with parallel
      const { resource: publisher } = await usersContainer.item(post.publisherId, post.publisherId).read<UserResource>()

      const { resources } = await postVotesContainer.items.query<{ voteCount: number }>(createQueryPostVotesByPostId(post.id)).fetchAll()
      const { voteCount } = resources[0]

      let myVote: MyVoteType = 'none'
      if (user) {
        const { resources } = await postVotesContainer.items
          .query<{ isUpvote: boolean }>(createQueryPostVoteByPostIdAndUserId(post.id, user.id))
          .fetchAll()
        myVote = resources[0].isUpvote ? 'up' : 'down'
      }

      const { resource: parentChannel } = await channelsContainer.item(post.parentChannelId, post.parentChannelId).read<ChannelResource>()
      const channel: ChannelInPostView = {
        ...parentChannel,
        amIOwner: user?.id == parentChannel.ownerId,
        amIModerator: user ? parentChannel.moderatorIds.includes(user?.id) : false
      }

      const returnable: PostView = {
        ...post,
        publisher,
        channel,
        voteCount,
        myVote,
        amIPublisher: user?.id == publisher.id
      }
      return returnable
    })
  )

  context.res = {
    body: returnables
  }
}

export default httpTrigger