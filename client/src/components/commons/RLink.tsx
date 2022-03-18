import { Link as ChakraLink, LinkProps, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type RLinkProps = {
  isExternal?: boolean
  to: string
} & LinkProps

export const RLink: FC<RLinkProps> = ({ isExternal, to, children, ...props }) => {
  const ButtonComponent = (
    <ChakraLink color={useColorModeValue('themeHelper.500', 'themeHelper.300')} {...props}>
      {children}
    </ChakraLink>
  )
  return isExternal ? (
    <a href={to} target="_blank" rel="noreferrer">
      {ButtonComponent}
    </a>
  ) : (
    <RouterLink to={to}>{ButtonComponent}</RouterLink>
  )
}
