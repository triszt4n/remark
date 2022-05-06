import { useEffect, useState } from 'react'

export function useLocalStorage<StateType>(
  storageKey: string,
  fallbackState: StateType
): [StateType, React.Dispatch<React.SetStateAction<StateType>>, () => void] {
  const [value, setValue] = useState<StateType>(JSON.parse(localStorage.getItem(storageKey) || '{}') || fallbackState)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  }, [value, storageKey])

  const resetValue = () => {
    setValue(JSON.parse(localStorage.getItem(storageKey) || '{}') || fallbackState)
  }

  return [value, setValue, resetValue]
}
