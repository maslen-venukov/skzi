import { Response, NextFunction } from 'express'
import { UserRoles } from '../enums/user-roles.enum'
import { AuthRequest } from '../interfaces/auth-request.interface'
import { ApiError } from '../exceptions/api-error'
import { logger } from '../utils/logger'

export const rolesMiddleware = (roles: UserRoles[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  if(!req.user) {
    throw ApiError.Unauthorized()
  }

  if(req.user.role.role === UserRoles.System) {
    return next()
  }

  if(!roles.includes(req.user.role.role)) {
    if(process.env.NODE_ENV === 'production') {
      logger.log({ fileName: 'roles', data: { roles }, req })
    }
    throw ApiError.Forbidden()
  }

  next()
}

export const adminRolesMiddleware = () => rolesMiddleware([UserRoles.Admin])

export const operatorRolesMiddleware = () => rolesMiddleware([UserRoles.Admin, UserRoles.Operator])