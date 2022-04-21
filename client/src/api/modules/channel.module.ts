import { ChannelView, PostView, UserView } from '@triszt4n/remark-types'
import { TRISZT4N } from './post.module'

type ModeratorInfo = { owner: UserView; moderators: UserView[] }

class ChannelModule {
  async fetchModeratorInfoOfChannel(uriName: string): Promise<ModeratorInfo> {
    return {
      // todo: delete
      owner: {
        imageUrl:
          'https://scontent.fbud4-1.fna.fbcdn.net/v/t1.6435-9/180978949_314228950059549_1005358403722529104_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=TghG0FaBcCgAX_7zWqB&_nc_ht=scontent.fbud4-1.fna&oh=00_AT-iOuxSFqijJtyc0FyxvB6gvaPXcJspczQZuePUjbBQqA&oe=6284478E',
        username: 'triszt4n',
        firstName: 'user',
        lastName: 'name',
        email: 'none',
        id: '1234'
      },
      moderators: [
        {
          username: 'POTUS',
          firstName: 'user',
          lastName: 'name',
          email: 'none',
          id: '23455'
        }
      ]
    }
  }

  async fetchPostsOfChannel(uriName: string): Promise<PostView[]> {
    return [
      {
        id: '1',
        createdAt: 1650463827,
        title: 'What am I doing here?',
        rawMarkdown:
          '### Never say never\n\nSaid someone very wise.wwww' +
          'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n',
        publisher: TRISZT4N,
        parentChannelUriName: 'asd',
        voteCount: 2455,
        amIPublisher: true,
        myVote: 'none'
      },
      {
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
    ]
  }

  async fetchChannel(uriName: string): Promise<ChannelView> {
    return {
      id: '1',
      createdAt: 1650463827,
      title: 'Cute kitties',
      uriName: 'asd',
      descRawMarkdown: `## Overview

* **Follows** [CommonMark](https://commonmark.org)
* Renders *actual* React elements instead of using \`dangerouslySetInnerHTML\`

## Syntax highlighting

Here is an example of a plugin to highlight code: [rehype-highlight](https://github.com/rehypejs/rehype-highlight).

\`\`\`js
ReactDOM.render(
  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{'# Your markdown here'}</ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`
`,
      joinCount: 123123,
      postsCount: 123,
      ownerUsername: 'triszt4n',
      amIJoined: true,
      amIModerator: true,
      amIOwner: true
    }
  }
}

export const channelModule = new ChannelModule()
