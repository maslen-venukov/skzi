import { Response, NextFunction } from 'express'
import { TokenService } from '../token/token.service'
import { UsersService } from '../users/users.service'
import { ApiError } from '../exceptions/api-error'
import { AuthRequest } from '../interfaces/auth-request.interface'
import { User } from '../users/user.interface'
import logData from '../utils/logData'

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
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

    const payload = TokenService.validate(token) as User
    if(!payload) {
      return unauthorizedError()
    }

    const user = await UsersService.getById(payload.id)
    if(!user.isActive) {
      if(process.env.NODE_ENV === 'production') {
        logData({ fileName: 'blocked', data: { user }, req })
      }
      return next(ApiError.Forbidden())
    }

    req.user = user
    next()
  } catch(e) {
    return unauthorizedError()
  }
}

export default authMiddleware