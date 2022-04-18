import { Heading, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { RLayout } from '../../components/commons/RLayout'
import { RemarkEditor } from '../../components/editor/RemarkEditor'

export const ExplorePage: FC = () => {
  const onSendComment = (rawMarkdown: string) => {
    console.log('[DEBUG] sending', rawMarkdown)
  }

  return (
    <RLayout>
      <VStack spacing={6} alignItems="flex-start">
        <Heading>This is the sandbox page for now.</Heading>
        <RemarkEditor onSend={onSendComment} startingRawMarkdown={markdown} promptText="Leave a comment" submitButtonText="Send comment" />
      </VStack>
    </RLayout>
  )
}

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
