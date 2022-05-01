import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer } from '@chakra-ui/react'
import { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FaUpload } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { userModule } from '../../../api/modules/user.module'
import { FileUpload } from '../../../components/form-elements/FileUpload'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const UploadImageModal: FC<Props> = ({ isOpen, onClose }) => {
  const methods = useForm<{ files: FileList }>({ mode: 'all' })
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    setError
  } = methods

  const { loggedInUser, refetchUser } = useAuthContext()
  if (!loggedInUser) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You are not logged in!</ModalHeader>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    )
  }

  const mutation = useMutation(userModule.uploadProfileImage, {
    onSuccess: () => {
      refetchUser()
      onClose()
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at uploadProfileImage', err.toJSON())
      setError('files', { type: 'custom', message: err.response.data.message || err.message })
    }
  })

  const onSubmitFile: SubmitHandler<{ files: FileList }> = (values) => {
    const formData = new FormData()
    formData.append('file', values.files[0])
    mutation.mutate({ imageFileData: formData })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitFile)}>
            <ModalHeader>Change user profile image</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FileUpload required fieldName="files" helper={<>Choose a file to upload as image</>} />
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" colorScheme="theme" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Spacer />
              <Button rightIcon={<FaUpload />} colorScheme="theme" disabled={!isValid} isLoading={isSubmitting} type="submit">
                Upload
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}
