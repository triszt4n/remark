import { Box, Flex, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { channelModule } from '../../api/modules/channel.module'
import { RLayout } from '../../components/commons/RLayout'
import { AboutTab } from './components/AboutTab'
import { JoinCounter } from './components/JoinCounter'
import { PostsTab } from './components/PostsTab'

export const ChannelPage: FC = () => {
  const { channelId } = useParams()
  const { isLoading, data: channel, error } = useQuery(['channelInfo', channelId], () => channelModule.fetchChannel(channelId!!))

  if (error) {
    console.log('[DEBUG] at ChannelPage: AboutTab', error)
    return <Navigate replace to="/error" state={{ title: "Error when fetching channel's details!", messages: [(error as any)?.message] }} />
  }

  return (
    <RLayout>
      <Box width="full">
        {isLoading ? (
          <>
            <Skeleton height="2.25rem" mb={2} />
            <Skeleton height="1rem" mb={5} />
          </>
        ) : (
          <Flex justifyContent="space-between" flexWrap="wrap" alignItems="center" mb={5}>
            <Box wordBreak="break-all">
              <Text fontSize="4xl" fontWeight={700}>
                {channel?.uriName}
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>{channel?.title}</Text>
            </Box>
            <JoinCounter channel={channel!!} joinCount={channel?.joinCount || 0} />
          </Flex>
        )}
        <Tabs isFitted>
          <TabList>
            <Tab>Posts</Tab>
            <Tab>About</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={{ base: 0, md: 2 }}>
              <PostsTab channelId={channelId!!} />
            </TabPanel>
            <TabPanel>
              <AboutTab channelId={channelId!!} isLoading={isLoading} channel={channel} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </RLayout>
  )
}
