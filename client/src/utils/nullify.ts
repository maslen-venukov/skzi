const nullify = (obj: object) => (
  Object.entries(obj).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: typeof value === 'undefined' || value === '' ? null : value
  }), {})
)

export default nullify