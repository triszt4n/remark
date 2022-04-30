import { Button, Flex, VStack } from '@chakra-ui/react'
import { PostView, UpdatePostView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FaCheck, FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { RemarkEditor } from '../../../components/editor/RemarkEditor'
import { FileUpload } from '../../../components/form-elements/FileUpload'
import { TextField } from '../../../components/form-elements/TextField'

type Props = {
  sendButtonText: string
  onSend: (creatable: UpdatePostView & { imageFileData?: any }) => void
  defaultValues?: PostView
  showImageSection?: boolean
}

export const PostForm: FC<Props> = ({ sendButtonText, onSend, defaultValues, showImageSection }) => {
  const navigate = useNavigate()
  const methods = useForm<UpdatePostView>({ mode: 'all' })
  const {
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = methods

  const onSubmit: SubmitHandler<UpdatePostView> = (values) => {
    let formData = undefined
    if (showImageSection) {
      formData = new FormData()
      // todo: fix
      // formData.append('file', (values as CreatePostView).imageFileData[0])
    }
    onSend({ ...values, imageFileData: formData })
  }

  return (
    <FormProvider {...methods}>
      <VStack align="stretch" spacing={14} as="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          defaultValue={defaultValues?.title}
          validationOptions={{
            maxLength: 64,
            minLength: 3,
            required: true
          }}
          fieldName="title"
          fieldTitle="Title"
          helper={<>The title of your post</>}
        />
        {showImageSection && <FileUpload fieldName="file" helper={<>Choose a file to upload as image</>} />}
        <RemarkEditor
          formDetails={{
            id: 'rawMarkdown',
            promptText: 'Add a description to your post.',
            maxChar: 1000
          }}
          defaultValue={defaultValues?.rawMarkdown}
        />
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Button variant="outline" leftIcon={<FaChevronLeft />} colorScheme="theme" onClick={() => navigate(-1)} type="button">
            Back
          </Button>
          <Button disabled={!isValid} rightIcon={<FaCheck />} colorScheme="theme" isLoading={isSubmitting} type="submit">
            {sendButtonText}
          </Button>
        </Flex>
      </VStack>
    </FormProvider>
  )
}
