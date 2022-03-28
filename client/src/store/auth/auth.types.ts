import { User } from '../users/users.types'

export interface AuthState {
  isAuth: boolean
  isLoading: boolean
  isReady: boolean
  user: User | null
}

export interface AuthResponse {
  user: User
}

export interface LoginResponse extends AuthResponse {
  token: string
}

export interface LoginPayload {
  name: string
  password: string
}