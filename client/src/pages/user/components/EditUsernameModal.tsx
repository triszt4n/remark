import {
  Button,
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
import { ChangeEventHandler, FC, useState } from 'react'
import { FaCheck } from 'react-icons/fa'

type Props = {
  currentUsername: string
  isOpen: boolean
  onClose: () => void
  onSave: (newUsername: string) => Promise<string>
}

export const EditUsernameModal: FC<Props> = ({ currentUsername, isOpen, onClose, onSave }) => {
  const [isError, setIsError] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const [newUsername, setNewUsername] = useState<string>(currentUsername)

  const onPressedSave = async () => {
    const answer = await onSave(newUsername)
    if (answer === '') {
      onClose()
    } else {
      setIsError(true)
      setErrorText(answer)
    }
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewUsername(e.target.value)
    if (currentUsername === e.target.value) {
      setIsError(true)
      setErrorText('New username cannot be the same as before!')
    } else {
      setIsError(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Changing your username</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={isError}>
            <FormLabel htmlFor="username">New username</FormLabel>
            <Input id="username" type="username" onChange={handleInputChange} />
            {!isError ? (
              <FormHelperText>Choose a unique new username for yourself!</FormHelperText>
            ) : (
              <FormErrorMessage>{errorText}</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" colorScheme="theme" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Spacer />
          <Button rightIcon={<FaCheck />} colorScheme="theme" onClick={onPressedSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
