import { Badge, Box, Button, Code, Heading, LinkBox, LinkOverlay, Text, VStack } from '@chakra-ui/react'
import { ChannelPartialView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../../api/contexts/auth/useAuthContext'
import { ellipsifyLongText, toReadableNumber, toRelativeDateString } from '../../../../util/core-util-functions'

type Props = {
  channel: ChannelPartialView
}

export const JoinedChannel: FC<Props> = ({ channel }) => {
  const { isLoggedIn } = useAuthContext()
  const targetPath = `/channels/${channel.id}`
  const navigate = useNavigate()

  return (
    <LinkBox display="inline-block" mx={1} borderWidth="1px" borderRadius="md" p={3} w="14rem">
      <VStack>
        <Code fontSize="xs">ch/{channel.uriName}</Code>
        <Heading size="sm">
          <LinkOverlay as={Link} to={targetPath}>
            {ellipsifyLongText(channel.title, 32)}
          </LinkOverlay>
        </Heading>
        <Box>
          <Badge colorScheme="theme" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
            {toReadableNumber(channel.joinCount)} joined
          </Badge>
        </Box>
        {isLoggedIn && (
          <VStack justifyContent="center">
            <Box>
              <Button
                size="sm"
                colorScheme="themeHelper"
                variant={channel.amIJoined ? 'outline' : 'solid'}
                onClick={() => navigate(targetPath)}
              >
                {channel.amIJoined ? 'Leave' : 'Join'}
              </Button>
            </Box>
            {channel.amIJoined && (
              <Box>
                <Text fontSize="xs">joined {toRelativeDateString(channel.joinedAt)}</Text>
              </Box>
            )}
          </VStack>
        )}
      </VStack>
    </LinkBox>
  )
}
