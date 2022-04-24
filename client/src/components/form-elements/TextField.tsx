import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { FC } from 'react'
import { useFormContext, ValidationRule } from 'react-hook-form'

type Props = {
  fieldName: string
  helper?: JSX.Element
  defaultValue?: string
  validationOptions?: {
    maxLength?: number
    minLength?: number
    required?: boolean
    pattern?: ValidationRule<RegExp>
    setValueAs?: (value: any) => any
  }
}

export const TextField: FC<Props> = ({
  fieldName,
  helper,
  defaultValue,
  validationOptions: { maxLength, minLength, required, pattern, setValueAs } = {}
}) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <FormControl isRequired isInvalid={!!errors.title}>
      <FormLabel htmlFor={fieldName}>Title</FormLabel>
      <Input
        id={fieldName}
        type="text"
        {...register(fieldName, {
          required: required ? 'Required field' : false,
          maxLength: maxLength ? { value: maxLength, message: `Too long, maximum length is ${maxLength} characters` } : undefined,
          minLength: minLength ? { value: minLength, message: `Too short, minimum length is ${minLength} characters` } : undefined,
          pattern,
          setValueAs
        })}
        defaultValue={defaultValue}
      />
      {errors?.title ? <FormErrorMessage>{errors.title.message}</FormErrorMessage> : helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  )
}
