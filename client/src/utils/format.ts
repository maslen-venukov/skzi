const getDate = (date: string | Date) => date instanceof Date ? date : new Date(date)

export const formatDate = (date: string | Date) => (
  getDate(date).toLocaleDateString()
)

export const formatDateTime = (date: string | Date) => (
  getDate(date).toLocaleString()
)