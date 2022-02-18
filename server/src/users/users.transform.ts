import { UserRolesService } from '../user-roles/user-roles.service'
import { RawUser, User } from './user.interface'

export class UsersTransform {
  static async expandUserWithRole(
    user: RawUser,
    options: {
      includePassHash?: boolean
    } = {}
  ) {
    const { roleId, passHash, ...rest } = user
    const role = await UserRolesService.getById(roleId)
    return {
      ...rest,
      ...options.includePassHash ? { passHash } : {},
      role
    } as User & { passHash?: string }
  }
}