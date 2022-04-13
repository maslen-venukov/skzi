const getDate = (date: string | Date) => date instanceof Date ? date : new Date(date)

export const formatDate = (date?: string | Date) => (
  date ? getDate(date).toLocaleDateString() : null
)

export const formatDateTime = (date?: string | Date) => (
  date ? getDate(date).toLocaleString() : null
)