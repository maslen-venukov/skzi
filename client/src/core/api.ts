import axios from 'axios'
import authStore from '../store/auth/auth.store'
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

api.interceptors.response.use(
  res => res,
  e => {
    if(e.response?.status === 401) {
      authStore.setAuth(false)
      authStore.setUser(null)
      storage.remove('token')
    }
    throw e
  }
)

export default api