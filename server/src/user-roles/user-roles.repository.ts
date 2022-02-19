import { UserRole } from './user-role.interface'
import { Repository } from '../core/repository'

export const userRolesRepository = new Repository<UserRole>({
  table: 's_user_role',
  fields: {
    id: 'id',
    role: 'role'
  }
})