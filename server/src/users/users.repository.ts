import { RawUser } from './user.interface'
import { Repository } from '../core/repository'

export const usersRepository = new Repository<RawUser>({
  table: 'users',
  fields: {
    id: 'id',
    name: 'name',
    realName: 'real_name',
    passHash: 'pass_hash',
    roleId: 'role_id',
    isActive: 'is_active'
  }
})