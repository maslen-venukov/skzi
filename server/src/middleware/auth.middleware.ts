import { Response, NextFunction } from 'express'
import { tokenService } from '../token/token.service'
import { usersService } from '../users/users.service'
import { ApiError } from '../exceptions/api-error'
import { AuthRequest } from '../interfaces/auth-request.interface'
import { User } from '../users/user.interface'
import { logData } from '../utils/logData'

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const unauthorizedError = () => next(ApiError.Unauthorized())

  try {
    const { authorization } = req.headers
    if(!authorization) {
      return unauthorizedError()
    }

    const type = authorization.split(' ')[0]
    if(type !== 'Bearer') {
      return unauthorizedError()
    }

    const token = authorization.split(' ')[1]
    if(!token) {
      return unauthorizedError()
    }

    const payload = tokenService.validate(token) as User
    if(!payload) {
      return unauthorizedError()
    }

    const user = await usersService.getById(payload.id)
    if(!user.isActive) {
      return next(ApiError.Forbidden())
    }

    req.user = user
    next()
  } catch(e) {
    return unauthorizedError()
  }
}