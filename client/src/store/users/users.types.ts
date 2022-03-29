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

export interface UpdateUserData extends Partial<Omit<User, 'role'>> {
  roleId?: number
}

export interface GetUsersResponse {
  users: User[]
}

export interface UpdateUserResponse {
  message: string
  user: User
}