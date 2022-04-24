import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  defaultValue?: string
}

export const TitleField: FC<Props> = ({ defaultValue }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <FormControl isRequired isInvalid={!!errors.title}>
      <FormLabel htmlFor="title">Title</FormLabel>
      <Input
        id="title"
        type="text"
        {...register('title', {
          required: 'Required field',
          maxLength: { value: 64, message: 'Too long, maximum length is 64 characters' },
          minLength: { value: 3, message: 'Too short, minimum length is 3 characters' }
        })}
        defaultValue={defaultValue}
      />
      {errors?.title ? (
        <FormErrorMessage>{errors.title.message}</FormErrorMessage>
      ) : (
        <FormHelperText>The title to your channel</FormHelperText>
      )}
    </FormControl>
  )
}
