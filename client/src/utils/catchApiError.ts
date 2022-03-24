import { AxiosError } from 'axios'
import { message } from 'antd'

const catchApiError = (e: unknown) => {
  message.error((e as AxiosError<{ message: string }>).response?.data.message || 'Что-то пошло не так')
}

export default catchApiError