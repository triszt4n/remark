import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { ReactComponent as LogoComponent } from './svg/remark-logo-sm.svg'

export const RLogoSimple: React.FC<any> = (props) => <LogoComponent {...props} fill={useColorModeValue('black', 'white')} />
