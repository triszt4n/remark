import {
  Button,
  Code,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer
} from '@chakra-ui/react'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'

type Props = {
  currentUsername: string
  isOpen: boolean
  onClose: () => void
  onSave: (newUsername: string) => Promise<string>
}

export const EditUsernameModal: FC<Props> = ({ currentUsername, isOpen, onClose, onSave }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
    setError
  } = useForm<{ newUsername: string }>({ mode: 'all' })

  const onSubmit: SubmitHandler<{ newUsername: string }> = async (values) => {
    const answer = await onSave(values.newUsername)
    if (answer === '') {
      onClose()
    } else {
      setError('newUsername', { type: 'custom', message: answer })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Change your username</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={!!errors.newUsername}>
              <FormLabel htmlFor="newUsername">New username</FormLabel>
              <Input
                id="newUsername"
                type="username"
                {...register('newUsername', {
                  required: 'Required field',
                  maxLength: { value: 32, message: 'Too long, maximum length is 32 characters' },
                  minLength: { value: 3, message: 'Too short, minimum length is 3 characters' },
                  pattern: { value: /^[a-z0-9_]+$/i, message: 'Field can contain only alphanumeric and underscore characters' },
                  validate: {
                    notSameAsOld: (v) => v !== currentUsername || 'New username cannot be the current one'
                  },
                  setValueAs: (value) => value?.toLowerCase()
                })}
              />
              {errors?.newUsername ? (
                <FormErrorMessage>{errors.newUsername.message}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Your profile will be available at{' '}
                  <Code>
                    {window.location.hostname}/u/{watch('newUsername') || `<username>`}
                  </Code>
                </FormHelperText>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" colorScheme="theme" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Spacer />
            <Button rightIcon={<FaCheck />} colorScheme="theme" disabled={!isValid} isLoading={isSubmitting} type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
