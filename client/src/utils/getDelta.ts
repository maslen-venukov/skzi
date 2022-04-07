const getDelta = <T extends object>(first: T, second: T): Partial<T> => (
  Object.entries(first).reduce((acc, [key, value]) => (
    value !== second[key as keyof T]
      ? { ...acc, [key]: value }
      : acc
  ), {})
)

export default getDelta