import api from '../../core/api'
import { User, LoginPayload, AuthResponse } from './auth.types'

export const auth = async () => (
  await api.get<{ user: User }>('/api/auth')
)

export const login = async (data: LoginPayload) => (
  await api.post<AuthResponse>('/api/auth/login', data)
)