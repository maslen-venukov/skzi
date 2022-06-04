import { Role } from '../roles/roles.types'

export interface User {
  id: number
  name: string
  realName: string
  isActive: boolean
  role: Role
}

export interface CreateUserData {
  name: string
  password: string
  realName: string
  roleId: number
}

export interface UpdateUserData extends Partial<Omit<User, 'id' | 'role'>> {
  roleId?: number
}