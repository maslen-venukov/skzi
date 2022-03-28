import api from '../../core/api'
import { LoginPayload, AuthResponse, LoginResponse } from './auth.types'

export const auth = async () => (
  await api.get<AuthResponse>('/api/auth')
)

export const login = async (data: LoginPayload) => (
  await api.post<LoginResponse>('/api/auth/login', data)
)