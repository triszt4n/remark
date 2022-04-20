import { Box, useBreakpointValue } from '@chakra-ui/react'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { ellipsifyLongText } from '../../../../../util/core-util-functions'

type Props = {
  rawMarkdown: string
}

export const PostPreviewDescription: FC<Props> = ({ rawMarkdown }) => {
  return (
    <Box wordBreak="break-all" fontSize={{ base: 'sm', md: 'md' }}>
      <ReactMarkdown
        allowedElements={[]}
        unwrapDisallowed
        children={ellipsifyLongText(rawMarkdown, useBreakpointValue({ base: 100, sm: 150, md: 300, lg: 600 }))}
        skipHtml
      />
    </Box>
  )
}
