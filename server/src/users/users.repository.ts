import { Repository } from '../core/repository'
import { RawUser } from './user.interface'

class UsersRepository extends Repository<RawUser> {
  constructor() {
    super({
      table: 'users',
      columns: [
        'id',
        'name',
        'realName',
        'passHash',
        'roleId',
        'isActive'
      ]
    })
  }
}

export const usersRepository = new UsersRepository()