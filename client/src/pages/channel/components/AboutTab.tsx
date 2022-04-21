import { Box, Flex, Skeleton, Stat, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Channel } from '../../../api/models/channel.model'
import { toDateString, toReadableNumber } from '../../../util/core-util-functions'
import { ModeratorsSection } from './moderator/ModeratorsSection'

type Props = {
  uriName: string
  isLoading: boolean
  channel: Channel | undefined
}

export const AboutTab: FC<Props> = ({ uriName, isLoading, channel }) => {
  if (isLoading) {
    return (
      <>
        <Flex flexDir={{ base: 'column', md: 'row' }} mb={2}>
          <Stat borderWidth="1px" borderRadius="lg" p={4} flex={1}>
            <StatLabel>Channel</StatLabel>
            <Skeleton height="2rem" width="80%" />
            <Skeleton height="1rem" width="70%" mt={2} />
          </Stat>
          <Stat borderWidth="1px" borderRadius="lg" p={4} flex={1} mt={{ base: 2, md: 0 }} ml={{ base: 0, md: 2 }}>
            <StatLabel>Statistics</StatLabel>
            <Skeleton height="2rem" width="80%" />
            <Skeleton height="1rem" width="70%" mt={2} />
          </Stat>
        </Flex>
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Text fontSize="sm">Description</Text>
          <Skeleton height="2rem" width="60%" mt={4} />
          <Skeleton height="1rem" width="100%" mt={2} />
          <Skeleton height="1rem" width="70%" mt={2} />
          <Skeleton height="1rem" width="100%" mt={4} />
          <Skeleton height="1rem" width="30%" mt={2} />
        </Box>
      </>
    )
  }

  return (
    <VStack spacing={14} align="stretch">
      <Flex flexDir={{ base: 'column', md: 'row' }}>
        <Stat flex={1}>
          <StatLabel>Channel</StatLabel>
          <StatNumber>{channel!!.title}</StatNumber>
          <StatHelpText>channel founded {toDateString(channel!!.createdAt)}</StatHelpText>
        </Stat>
        <Stat flex={1} mt={{ base: 2, md: 0 }} ml={{ base: 0, md: 2 }}>
          <StatLabel>Statistics</StatLabel>
          <StatNumber>{toReadableNumber(channel!!.postsCount)} posts in channel</StatNumber>
          <StatHelpText>{toReadableNumber(channel!!.joinCount)} users joined</StatHelpText>
        </Stat>
      </Flex>
      <Box>
        <Text fontSize="sm">Description</Text>
        <ReactMarkdown components={ChakraUIRenderer()} children={channel!!.descRawMarkdown} skipHtml />
      </Box>
      <Box>
        <ModeratorsSection uriName={uriName} />
      </Box>
    </VStack>
  )
}
