import { Request, Response, NextFunction } from 'express'
import { UserRoles } from '../enums/user-roles.enum'
import { userRolesService } from './user-roles.service'

class UserRolesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await userRolesService.getAll()
      const filtered = roles.filter(role => role.role !== UserRoles.System)
      return res.json({ roles: filtered })
    } catch(e) {
      next(e)
    }
  }
}

export const userRolesController = new UserRolesController()