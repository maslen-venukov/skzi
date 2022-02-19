import { userRolesService } from '../user-roles/user-roles.service'
import { RawUser, User } from './user.interface'

class UsersTransform {
  async expandUserWithRole(
    user: RawUser,
    options: {
      includePassHash?: boolean
    } = {}
  ) {
    const { roleId, passHash, ...rest } = user
    const role = await userRolesService.getById(roleId)
    return {
      ...rest,
      ...options.includePassHash ? { passHash } : {},
      role
    } as User & { passHash?: string }
  }
}

export const usersTransform = new UsersTransform()
// TODO перенести includePassHash в сервис при вызове репозитория
// TODO мб перейти на knex