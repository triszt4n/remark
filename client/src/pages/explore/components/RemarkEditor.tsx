import { FC } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'

export const RemarkEditor: FC = () => {
  const componentOptions: Components = {
    // Map `h1` (`# heading`) to use `h2`s.
    h1: 'h1'
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

  return <ReactMarkdown components={componentOptions} children={markdown} />
}
