import { Box, Heading, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import { userModule } from '../../api/modules/user.module'
import { PuzzleAnimated } from '../../components/commons/PuzzleAnimated'
import { RLayout } from '../../components/commons/RLayout'
import { RLink } from '../../components/commons/RLink'
import { RemarkEditor } from './components/RemarkEditor'

export const ExplorePage: FC = () => {
  const { isLoading, data: users, error } = useQuery('users', userModule.fetchUsers)
  const onSendComment = (rawMarkdown: string) => {
    console.log('[DEBUG] sending', rawMarkdown)
  }

  if (isLoading || !users) {
    return (
      <RLayout>
        <PuzzleAnimated text="Loading users" />
      </RLayout>
    )
  }

  if (error) {
    console.log('[DEBUG] at ProfilePage: fetchUserByUsername', error)
    return <Navigate replace to="/error?messages=Error when fetching user's profile!" />
  }

  return (
    <RLayout>
      <VStack spacing={6} alignItems="flex-start">
        <Heading>This is the sandbox page for now.</Heading>
        {users.map(({ username, firstName, lastName, email }) => (
          <VStack key={username} alignItems="flex-start">
            <Box>
              username: <RLink to={`/u/${username}`}>{username}</RLink>
            </Box>
            <Box>email: {email}</Box>
            <Box>
              fullname: {firstName} {lastName}
            </Box>
          </VStack>
        ))}
        <RemarkEditor onSend={onSendComment} startingRawMarkdown={markdown} />
      </VStack>
    </RLayout>
  )
}

const markdown = `
## Overview

* **Follows** [CommonMark](https://commonmark.org)
* Renders *actual* React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`h1\`)
* Has a lot of plugins

## Syntax highlighting

Here is an example of a plugin to highlight code:
[\`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).

\`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

ReactDOM.render(
  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{'# Your markdown here'}</ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`
`
