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
import { RLink } from '../../../components/commons/RLink'

type TextAreaStatus = {
  isError: boolean
  message: string
}

const MAX_CHARACTER_IN_TEXTAREA = 500

const getCurrentStatus = (currentTextLength: number): TextAreaStatus => {
  if (currentTextLength > MAX_CHARACTER_IN_TEXTAREA) {
    return { isError: true, message: `Your comment cannot be longer than ${MAX_CHARACTER_IN_TEXTAREA} characters!` }
  } else {
    return { isError: false, message: `${currentTextLength} / ${MAX_CHARACTER_IN_TEXTAREA}` }
  }
}

type Props = {
  startingRawMarkdown?: string
  onSend: (rawMarkdown: string) => void
}

export const RemarkEditor: FC<Props> = ({ startingRawMarkdown, onSend }) => {
  const toast = useToast()
  const [rawMarkdown, setRawMarkdown] = useState<string>(startingRawMarkdown || '')
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

    if (!status.isError) {
      setRawMarkdown(value)
    }
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
                Leave a comment in markdown format!{' '}
                <RLink to="https://www.markdownguide.org/cheat-sheet/" isExternal>
                  See guide here.
                </RLink>
              </FormLabel>
              <Textarea
                id="rawMarkdown"
                isInvalid={status.isError}
                value={rawMarkdown}
                onChange={handleInputChange}
                placeholder="Leave a comment here"
                height="22rem"
              />
              <Flex justifyContent="flex-end">
                {status.isError ? <FormErrorMessage>{status.message}</FormErrorMessage> : <FormHelperText>{status.message}</FormHelperText>}
              </Flex>
            </FormControl>
          </TabPanel>
          <TabPanel>
            <Box maxHeight="26rem" overflowY="scroll">
              <ReactMarkdown components={ChakraUIRenderer()} children={rawMarkdown} skipHtml />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Flex justifyContent="flex-end">
        <Button
          disabled={status.isError || rawMarkdown.trim().length === 0}
          rightIcon={<FaPaperPlane />}
          colorScheme="theme"
          onClick={onTrySend}
        >
          Send comment
        </Button>
      </Flex>
    </Box>
  )
}
