import { useState } from 'react'

const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const setTrue = () => setValue(true)

  const setFalse = () => setValue(false)

  const toggle = () => setValue(!value)

  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle
  }
}

export default useBoolean