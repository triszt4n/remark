import { Box, Flex, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { FileUpload } from './FileUpload'
import { TextField } from './TextField'

type Props = {
  required?: boolean
}

export const ImageSection: FC<Props> = ({ required }) => {
  const [chosenRadio, setChosenRadio] = useState('1')
  const onRadioChange = (nextValue: string) => setChosenRadio(nextValue)

  return (
    <VStack align="stretch" spacing={3}>
      <RadioGroup value={chosenRadio} onChange={onRadioChange}>
        <Flex flexWrap="wrap">
          <Radio colorScheme="themeHelper" value="1" mr={4} mb={1}>
            Attach image by uploading
          </Radio>
          <Radio colorScheme="themeHelper" value="2" mb={1}>
            Attach image by URL
          </Radio>
        </Flex>
      </RadioGroup>
      <Box hidden={chosenRadio != '1'}>
        <FileUpload fieldName="imageFile" helper={<>{!required && '(optional) '}Choose a file to upload as image</>} />
      </Box>
      <Box hidden={chosenRadio != '2'}>
        <TextField
          validationOptions={{
            pattern: {
              value: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, // url
              message: 'Field can only be a valid URL for an image'
            }
          }}
          fieldName="imageUrl"
          helper={<>{!required && '(optional) '}Paste the URL of the desired image to attach to this post</>}
        />
      </Box>
    </VStack>
  )
}
