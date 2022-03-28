import { Role } from '../roles/roles.types'

export interface User {
  id: number
  name: string
  realName: string
  isActive: boolean
  role: Role
}

export interface UsersState {
  isLoading: boolean
  users: User[]
}

export interface GetUsersResponse {
  users: User[]
}