import { CommentView, PostView, UserView } from '@triszt4n/remark-types'

// todo: remove
export const TRISZT4N: UserView = {
  id: '123',
  firstName: 'Trisztán',
  lastName: 'Piller',
  username: 'triszt4n',
  email: 'hallo',
  imageUrl: 'https://static.onecms.io/wp-content/uploads/sites/13/2015/04/05/featured.jpg'
}

class PostModule {
  async fetchPost(id: string): Promise<PostView> {
    return {
      id: '2',
      createdAt: 1680460000,
      title: "It is what it's supposed to be",
      rawMarkdown: '# HIHIHI\n\n* hahaha\n* hohoho\n\nnyeh.\n',
      publisher: TRISZT4N,
      parentChannelUriName: 'asd',
      voteCount: -3200032,
      myVote: 'up',
      amIPublisher: true,
      imageUrl: 'https://cdn.pixabay.com/photo/2017/01/08/13/58/cube-1963036_960_720.jpg'
    }
  }

  async fetchCommentsOfPost(id: string): Promise<CommentView[]> {
    return [
      {
        id: '123',
        createdAt: 1650493280,
        publisher: { id: '123', firstName: 'This', lastName: 'user', username: 'username', email: 'hallo' },
        rawMarkdown: '## HIHIHI\n\n* hahaha\n* hohoho\n\nnyeh.',
        voteCount: 123123,
        amIPublisher: false,
        myVote: 'down'
      },
      {
        id: '1234',
        createdAt: 1650003280,
        publisher: { id: '123', firstName: 'This', lastName: 'user', username: 'username', email: 'hallo' },
        rawMarkdown:
          'asdfasdf klaj lja lkljfan m,mn,mn,m asdjiwperw akljl a sdnnnasdfl ééééa sdj klsj klj lapoo oopi paosidp oip a a nlnwe',
        voteCount: 123,
        amIPublisher: false,
        myVote: 'none'
      },
      {
        id: '123466',
        createdAt: 1650490000,
        publisher: TRISZT4N,
        rawMarkdown: '# Neat code\n\n```js\nwindow.location.reload()\n```',
        voteCount: -21,
        amIPublisher: true,
        myVote: 'up'
      }
    ]
  }
}

export const postModule = new PostModule()
