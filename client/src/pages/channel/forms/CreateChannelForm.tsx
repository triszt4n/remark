import { Button, Flex, VStack } from '@chakra-ui/react'
import { CreateChannelView } from '@triszt4n/remark-types'
import { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FaCheck, FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { RemarkEditor } from '../../../components/editor/RemarkEditor'
import { TitleField } from './form-elements/TitleField'
import { UriNameField } from './form-elements/UriNameField'

type Props = {
  onSend: (creatable: CreateChannelView) => void
}

export const CreateChannelForm: FC<Props> = ({ onSend }) => {
  const navigate = useNavigate()
  const methods = useForm<CreateChannelView>({ mode: 'all' })
  const {
    handleSubmit,
    formState: { isSubmitting, isValid }
  } = methods

  const onSubmit: SubmitHandler<CreateChannelView> = (values) => {
    onSend(values)
  }

  return (
    <FormProvider {...methods}>
      <VStack align="stretch" spacing={10} as="form" onSubmit={handleSubmit(onSubmit)}>
        <UriNameField />
        <TitleField />
        <RemarkEditor
          formDetails={{
            id: 'descRawMarkdown',
            promptText: 'Describe your channel.',
            maxChar: 1000
          }}
        />
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Button variant="outline" leftIcon={<FaChevronLeft />} colorScheme="theme" onClick={() => navigate(-1)} type="button">
            Back
          </Button>
          <Button disabled={!isValid} rightIcon={<FaCheck />} colorScheme="theme" isLoading={isSubmitting} type="submit">
            Create
          </Button>
        </Flex>
      </VStack>
    </FormProvider>
  )
}
