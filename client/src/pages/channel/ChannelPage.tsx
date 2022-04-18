import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'
import { RLayout } from '../../components/commons/RLayout'
import { AboutTab } from './components/AboutTab'
import { JoinCounter } from './components/JoinCounter'
import { ModeratorsTab } from './components/ModeratorsTab'
import { PostsTab } from './components/PostsTab'

export const ChannelPage: FC = () => {
  const { uriName } = useParams()
  const { isLoading, data: channel, error } = useQuery(['channelInfo', uriName], () => {})

  if (isLoading) {
    return <PuzzleAnimated text="Loading channel" />
  }

  if (error) {
    console.log('[DEBUG] at ChannelPage: AboutTab', error)
    return <Navigate replace to="/error?messages=Error when fetching channel's details!" />
  }

  return (
    <RLayout>
      <Box width="full">
        <Flex justifyContent="space-between" flexWrap="wrap" alignItems="center" mb={5}>
          <Box fontSize="4xl" fontWeight={700} wordBreak="break-all">
            {uriName}
          </Box>
          <JoinCounter />
        </Flex>
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
              <AboutTab uriName={uriName!!} />
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
