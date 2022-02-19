import { Repository } from '../core/repository'
import { UserRole } from './user-role.interface'

class UserRolesRepository extends Repository<UserRole> {
  constructor() {
    super({
      table: 's_user_role',
      columns: [
        'id',
        'role'
      ]
    })
  }
}

export const userRolesRepository = new UserRolesRepository()