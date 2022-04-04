import api from '../../core/api'
import { LoginData } from './auth.types'
import { User } from '../users/users.types'

export const auth = async () => (
  await api.get<{
    user: User
  }>('/api/auth')
)

export const login = async (data: LoginData) => (
  await api.post<{
    token: string
    user: User
  }>('/api/auth/login', data)
)