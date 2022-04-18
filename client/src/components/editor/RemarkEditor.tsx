import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  useToast
} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { ChangeEventHandler, FC, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { RLink } from '../commons/RLink'
import { getCurrentStatus, TextAreaStatus } from './editorUtils'

type Props = {
  promptText: string
  submitButtonText: string
  onSend: (rawMarkdown: string) => void
  startingRawMarkdown?: string
  submitButtonIcon?: JSX.Element
  textAreaHeight?: string | number
  previewHeight?: string | number
}

export const RemarkEditor: FC<Props> = ({
  promptText,
  submitButtonText,
  onSend,
  startingRawMarkdown = '',
  submitButtonIcon = <FaPaperPlane />,
  textAreaHeight = '22rem',
  previewHeight = '26rem'
}) => {
  const toast = useToast()
  const [rawMarkdown, setRawMarkdown] = useState<string>(startingRawMarkdown)
  const [status, setStatus] = useState<TextAreaStatus>(getCurrentStatus(startingRawMarkdown ? startingRawMarkdown.length : 0))

  const onTrySend = () => {
    if (status.isError || rawMarkdown.trim().length === 0) {
      toast({
        title: 'Invalid message body',
        description: 'You cannot send an invalid comment! See error messages.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } else {
      onSend(rawMarkdown)
    }
  }

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    let { value } = e.target
    setStatus(getCurrentStatus(value.length))
    setRawMarkdown(value)
  }

  return (
    <Box width="full">
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Edit</Tab>
          <Tab>Preview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormControl isInvalid={status.isError}>
              <FormLabel fontWeight={700} fontSize="lg" htmlFor="rawMarkdown">
                {`${promptText} `}
                <RLink to="https://www.markdownguide.org/cheat-sheet/" isExternal>
                  See guide here.
                </RLink>
              </FormLabel>
              <Textarea
                id="rawMarkdown"
                isInvalid={status.isError}
                onChange={handleInputChange}
                placeholder="Enter your markdown formatted text here..."
                height={textAreaHeight}
                defaultValue={startingRawMarkdown}
              />
              <Flex justifyContent="flex-end">
                {status.isError ? <FormErrorMessage>{status.message}</FormErrorMessage> : <FormHelperText>{status.message}</FormHelperText>}
              </Flex>
            </FormControl>
          </TabPanel>
          <TabPanel>
            <Box maxHeight={previewHeight} overflowY="scroll">
              <ReactMarkdown components={ChakraUIRenderer()} children={rawMarkdown} skipHtml />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Flex justifyContent="flex-end">
        <Button
          disabled={status.isError || rawMarkdown.trim().length === 0}
          rightIcon={submitButtonIcon}
          colorScheme="theme"
          onClick={onTrySend}
        >
          {submitButtonText}
        </Button>
      </Flex>
    </Box>
  )
}
