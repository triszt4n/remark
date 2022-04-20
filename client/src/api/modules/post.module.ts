import { Post } from '../models/post.model'

class PostModule {
  async fetchPost(): Promise<Post> {
    return {
      id: '2',
      createdAt: 1680460000,
      title: "It is what it's supposed to be",
      rawMarkdown: '# HIHIHI\n\n* hahaha\n* hohoho\n\nnyeh.\n',
      publisherUsername: 'triszt4n',
      parentChannelUriName: 'asd',
      voteCount: -3200032,
      myVote: 'up',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/01/08/13/58/cube-1963036_960_720.jpg'
    }
  }
}

export const postModule = new PostModule()
