import { userRolesRepository } from './user-roles.repository'
import { UserRoles } from '../enums/user-roles.enum'

class UserRolesService {
  async getAll() {
    return await userRolesRepository.getAll()
  }

  async getById(id: number) {
    return await userRolesRepository.getById(id)
  }

  async getByRole(role: UserRoles) {
    return await userRolesRepository.getOne({ role })
  }
}

export const userRolesService = new UserRolesService()