import { useEffect, useState } from 'react'

export default function useInputValidation(regExp: RegExp) {
  const [value, setValue] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (value === '') {
      setIsValid(undefined)
    } else {
      setIsValid(regExp.test(value))
    }
  }, [value, regExp])

  return [value, setValue, isValid] as const
}
