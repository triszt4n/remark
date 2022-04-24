import { Heading, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { RLayout } from '../../components/commons/RLayout'

export const ExplorePage: FC = () => {
  const onSend = (rawMarkdown: string) => {
    alert(`[DEBUG]: ${rawMarkdown}`)
  }

  return (
    <RLayout>
      <VStack spacing={6} alignItems="flex-start">
        <Heading>This is the sandbox page for now.</Heading>
      </VStack>
    </RLayout>
  )
}
