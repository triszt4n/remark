import { AzureFunction, Context } from '@azure/functions'
import { fetchCosmosContainer, fetchCosmosDatabase } from '../lib/dbConfig'
import { createQueryCommentsOfPostId, createQueryPostVotesByPostId } from '../lib/dbQueries'
import { CommentResource, DeletedPostResource, PostVoteResource } from '../lib/model'
import { fetchBlobContainer } from '../lib/storageConfig'

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: DeletedPostResource[]): Promise<void> {
  if (!documents && documents.length === 0) {
    context.log('Nothing to process at [DeletePostCosmosTrigger]')
    return
  }

  const database = fetchCosmosDatabase()
  const postsContainer = fetchCosmosContainer(database, 'Posts')
  const postVotesContainer = fetchCosmosContainer(database, 'PostVotes')
  const commentsContainer = fetchCosmosContainer(database, 'Comments')
  const blobContainer = fetchBlobContainer('remark-post-images')

  await Promise.all(
    documents
      .filter((post) => !!post.isDeleted)
      .map(async (post) => {
        // Soft delete comments of post
        const { resources: comments } = await commentsContainer.items
          .query<CommentResource>(createQueryCommentsOfPostId(post.id))
          .fetchAll()
        await Promise.all(
          comments.map(async (comment) => commentsContainer.item(comment.id, comment.id).replace({ ...comment, isDeleted: true }))
        )

        // Properly delete post votes
        const { resources: postVotes } = await postVotesContainer.items
          .query<PostVoteResource>(createQueryPostVotesByPostId(post.id))
          .fetchAll()
        await Promise.all(postVotes.map(async (postVote) => postVotesContainer.item(postVote.id, postVote.id).delete()))

        // If image given, delete it
        if (post.imageUrl) {
          const blobName = post.imageUrl.split('/').pop()
          await blobContainer.getBlockBlobClient(blobName).delete()
        }

        // Delete post
        return postsContainer.item(post.id, post.id).delete()
      })
  )
}

export default cosmosDBTrigger
