import { Roles } from '../../enums/Roles'

export interface Role {
  id: number
  role: Roles
}

export interface User {
  id: number
  name: string
  realName: string
  isActive: boolean
  role: Role
}

export interface AuthState {
  isAuth: boolean
  isLoading: boolean
  isReady: boolean
  user: User | null
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginPayload {
  name: string
  password: string
}