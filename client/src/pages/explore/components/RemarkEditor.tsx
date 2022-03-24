import { FC, useState } from 'react'
import SimpleMdeReact from 'react-simplemde-editor'

export const RemarkEditor: FC = () => {
  const [value, setValue] = useState('Initial value')

  const onChange = (value: string) => {
    setValue(value)
  }

  return <SimpleMdeReact value={value} onChange={onChange} />
}
