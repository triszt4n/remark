import { Heading, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { RLayout } from '../../components/commons/RLayout'
import { RemarkEditor } from './components/RemarkEditor'

export const ExplorePage: FC = () => {
  const onSendComment = (rawMarkdown: string) => {
    console.log('[DEBUG] sending', rawMarkdown)
  }

  return (
    <RLayout>
      <VStack spacing={6} alignItems="flex-start">
        <Heading>This is the sandbox page for now.</Heading>
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
