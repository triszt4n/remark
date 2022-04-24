import { Button, Flex, VStack } from '@chakra-ui/react'
import { ChannelView, UpdateChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FaCheck, FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { RemarkEditor } from '../../../components/editor/RemarkEditor'
import { TitleField } from './form-elements/TitleField'
import { UriNameField } from './form-elements/UriNameField'

type Props = {
  onSend: (updatable: UpdateChannelView) => void
  defaultValues: ChannelView
}

export const EditChannelForm: FC<Props> = ({ onSend, defaultValues }) => {
  const navigate = useNavigate()
  const methods = useForm<UpdateChannelView>({ mode: 'all' })
  const {
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = methods

  const onSubmit: SubmitHandler<UpdateChannelView> = (values) => {
    onSend(values)
  }

  return (
    <FormProvider {...methods}>
      <VStack align="stretch" spacing={10} as="form" onSubmit={handleSubmit(onSubmit)}>
        <UriNameField defaultValue={defaultValues.uriName} />
        <TitleField defaultValue={defaultValues.title} />
        <RemarkEditor
          formDetails={{
            id: 'descRawMarkdown',
            promptText: 'Describe your channel.',
            maxChar: 1000
          }}
          defaultValue={defaultValues.descRawMarkdown}
        />
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Button variant="outline" leftIcon={<FaChevronLeft />} colorScheme="theme" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button disabled={!isValid} rightIcon={<FaCheck />} colorScheme="theme" isLoading={isSubmitting} type="submit">
            Save
          </Button>
        </Flex>
      </VStack>
    </FormProvider>
  )
}
