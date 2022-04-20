import { Box, Flex, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { Channel } from '../../api/models/channel.model'
import { RLayout } from '../../components/commons/RLayout'
import { AboutTab } from './components/AboutTab'
import { JoinCounter } from './components/JoinCounter'
import { ModeratorsTab } from './components/ModeratorsTab'
import { PostsTab } from './components/PostsTab'

// todo: remove
const markdown = `## Overview

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
`

// todo: remove
const FAKE_CHANNEL: Channel = {
  createdAt: 1650463827,
  title: 'Cute kitties',
  uriName: 'asd',
  descRawMarkdown: markdown,
  joinedUserCount: 123123,
  postsCount: 123,
  ownerUsername: 'triszt4n'
}

export const ChannelPage: FC = () => {
  const { uriName } = useParams()
  const { isLoading, data /*: channel */, error } = useQuery(['channelInfo', uriName], () => {})
  const channel = FAKE_CHANNEL // todo: remove

  if (error) {
    console.log('[DEBUG] at ChannelPage: AboutTab', error)
    return <Navigate replace to="/error?messages=Error when fetching channel's details!" />
  }

  return (
    <RLayout>
      <Box width="full">
        {isLoading ? (
          <Skeleton height="2.25rem" mb={5} />
        ) : (
          <Flex justifyContent="space-between" flexWrap="wrap" alignItems="center" mb={5}>
            <Box fontSize="4xl" fontWeight={700} wordBreak="break-all">
              {uriName}
            </Box>
            <JoinCounter />
          </Flex>
        )}
        <Tabs isFitted>
          <TabList>
            <Tab>Posts</Tab>
            <Tab>About</Tab>
            <Tab>Moderators</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PostsTab uriName={uriName!!} />
            </TabPanel>
            <TabPanel>
              <AboutTab uriName={uriName!!} isLoading={isLoading} channel={channel} />
            </TabPanel>
            <TabPanel>
              <ModeratorsTab uriName={uriName!!} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </RLayout>
  )
}
