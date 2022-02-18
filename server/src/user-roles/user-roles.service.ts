import { UserRolesRepository } from './user-roles.repository'
import { UserRoles } from '../enums/user-roles.enum'

export class UserRolesService {
  static async getById(id: number) {
    return await UserRolesRepository.getById(id)
  }

  static async getByRole(role: UserRoles) {
    return await UserRolesRepository.getOne({ role })
  }
}