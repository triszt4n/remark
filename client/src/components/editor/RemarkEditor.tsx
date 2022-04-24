import {
  Box,
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
  Textarea
} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import { RLink } from '../commons/RLink'
import { getStatusString } from './editorUtils'

type Props = {
  formDetails: {
    id: string
    promptText: string
    maxChar: number
  }
  defaultValue?: string
  textAreaHeight?: string | number
  previewHeight?: string | number
}

export const RemarkEditor: FC<Props> = ({ textAreaHeight = '22rem', previewHeight = '26rem', defaultValue, formDetails }) => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext()

  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Edit</Tab>
        <Tab>Preview</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FormControl isInvalid={errors[formDetails.id]}>
            <FormLabel htmlFor={formDetails.id}>
              {`${formDetails.promptText} `}
              <RLink to="https://www.markdownguide.org/cheat-sheet/" isExternal>
                See guide here.
              </RLink>
            </FormLabel>
            <Textarea
              id={formDetails.id}
              placeholder="Enter your markdown formatted text here..."
              height={textAreaHeight}
              defaultValue={defaultValue}
              {...register(formDetails.id, {
                maxLength: { value: formDetails.maxChar, message: 'Text entered is too long!' }
              })}
              isInvalid={errors[formDetails.id]}
            />
            <Flex justifyContent="flex-end">
              {errors[formDetails.id] ? (
                <FormErrorMessage>
                  {errors[formDetails.id].message} {getStatusString(watch(formDetails.id), formDetails.maxChar)}
                </FormErrorMessage>
              ) : (
                <FormHelperText>{getStatusString(watch(formDetails.id), formDetails.maxChar)}</FormHelperText>
              )}
            </Flex>
          </FormControl>
        </TabPanel>
        <TabPanel>
          <Box maxHeight={previewHeight} overflowY="scroll">
            <ReactMarkdown components={ChakraUIRenderer()} children={watch(formDetails.id)} skipHtml />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
