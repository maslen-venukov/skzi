import axios from 'axios'
import storage from '../utils/storage'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

api.interceptors.request.use(config => {
  if(config.headers) {
    config.headers.authorization = `Bearer ${storage.get<string>('token')}`
  }
  return config
})

export default api