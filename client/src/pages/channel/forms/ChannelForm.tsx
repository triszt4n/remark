import { Button, Code, Flex, VStack } from '@chakra-ui/react'
import { ChannelView, CreateChannelView, UpdateChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FaCheck, FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { RemarkEditor } from '../../../components/editor/RemarkEditor'
import { TextField } from '../../../components/form-elements/TextField'

type View = CreateChannelView | UpdateChannelView

type Props = {
  sendButtonText: string
  onSend: (creatable: View) => void
  defaultValues?: ChannelView
  isSendLoading: boolean
}

export const ChannelForm: FC<Props> = ({ sendButtonText, onSend, defaultValues, isSendLoading }) => {
  const navigate = useNavigate()
  const methods = useForm<View>({ mode: 'all' })
  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = methods

  const onSubmit: SubmitHandler<View> = (values) => {
    onSend(values)
  }

  return (
    <FormProvider {...methods}>
      <VStack align="stretch" spacing={10} as="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          defaultValue={defaultValues?.uriName}
          validationOptions={{
            maxLength: 32,
            minLength: 3,
            required: true,
            pattern: { value: /^[a-z0-9_]+$/i, message: 'Field can contain only alphanumeric and underscore characters' },
            setValueAs: (value) => value?.toLowerCase()
          }}
          fieldName="uriName"
          fieldTitle="URI name"
          helper={
            <>
              Your channel will be available at{' '}
              <Code>
                {window.location.hostname}/ch/{watch('uriName') || `<your-uriname>`}
              </Code>
            </>
          }
        />
        <TextField
          defaultValue={defaultValues?.title}
          validationOptions={{
            maxLength: 64,
            minLength: 3,
            required: true
          }}
          fieldName="title"
          fieldTitle="Title"
          helper={<>The title of the channel</>}
        />
        <RemarkEditor
          formDetails={{
            id: 'descRawMarkdown',
            promptText: 'Describe your channel.',
            maxChar: 1000
          }}
          defaultValue={defaultValues?.descRawMarkdown}
        />
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Button variant="outline" leftIcon={<FaChevronLeft />} colorScheme="theme" onClick={() => navigate(-1)} type="button">
            Back
          </Button>
          <Button disabled={!isValid} rightIcon={<FaCheck />} colorScheme="theme" isLoading={isSendLoading} type="submit">
            {sendButtonText}
          </Button>
        </Flex>
      </VStack>
    </FormProvider>
  )
}
