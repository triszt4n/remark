import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { ReactComponent as LogoComponent } from './svg/remark-logo-big.svg'

export const RLogo: React.FC<any> = (props) => <LogoComponent {...props} fill={useColorModeValue('black', 'white')} />
