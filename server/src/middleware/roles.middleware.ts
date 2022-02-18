import { Response, NextFunction } from 'express'
import { UserRoles } from '../enums/user-roles.enum'
import { AuthRequest } from '../interfaces/auth-request.interface'
import { ApiError } from '../exceptions/api-error'
import logData from '../utils/logData'

const rolesMiddleware = (roles: UserRoles[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  if(!req.user) {
    throw ApiError.Unauthorized()
  }

  if(req.user.role.role === UserRoles.System) {
    return next()
  }

  if(!roles.includes(req.user.role.role)) {
    if(process.env.NODE_ENV === 'production') {
      logData({ fileName: 'roles', data: { roles }, req })
    }
    throw ApiError.Forbidden()
  }

  next()
}

export default rolesMiddleware