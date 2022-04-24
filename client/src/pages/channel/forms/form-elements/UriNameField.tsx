import { Code, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  defaultValue?: string
}

export const UriNameField: FC<Props> = ({ defaultValue }) => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext()

  return (
    <FormControl isRequired isInvalid={!!errors.uriName}>
      <FormLabel htmlFor="uriName">URI name</FormLabel>
      <Input
        id="uriName"
        type="text"
        {...register('uriName', {
          required: 'Required field',
          maxLength: { value: 32, message: 'Too long, maximum length is 32 characters' },
          minLength: { value: 3, message: 'Too short, minimum length is 3 characters' },
          pattern: { value: /^[a-z0-9_]+$/i, message: 'Field can contain only alphanumeric and underscore characters' },
          setValueAs: (value) => value?.toLowerCase()
        })}
        defaultValue={defaultValue}
      />
      {errors?.uriName ? (
        <FormErrorMessage>{errors.uriName.message}</FormErrorMessage>
      ) : (
        <FormHelperText>
          Your channel will be available at{' '}
          <Code>
            {window.location.hostname}/ch/{watch('uriName') || `<your-uriname>`}
          </Code>
        </FormHelperText>
      )}
    </FormControl>
  )
}
