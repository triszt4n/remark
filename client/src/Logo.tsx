import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { ReactComponent as LogoComponent } from './assets/svg/remark-logo-big.svg'

export const Logo: React.FC<any> = (props) => <LogoComponent {...props} fill={useColorModeValue('black', 'white')} />
