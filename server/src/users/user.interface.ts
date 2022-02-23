import { UserRole } from '../user-roles/user-role.interface'

export interface RawUser {
  id: number
  name: string
  realName: string
  passHash: string
  roleId: number
  isActive: boolean
}

export interface User extends Omit<RawUser, 'passHash' | 'roleId'> {
  role: UserRole
}