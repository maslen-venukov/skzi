import { userRolesService } from '../user-roles/user-roles.service'
import { RawUser, User } from './user.interface'

class UsersTransform {
  async expandWithRole(
    user: RawUser
  ) {
    const { roleId, ...rest } = user
    const role = await userRolesService.getById(roleId)
    return {
      ...rest,
      role
    } as User
  }
}

export const usersTransform = new UsersTransform()