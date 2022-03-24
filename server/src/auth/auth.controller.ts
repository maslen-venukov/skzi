import { Request, Response, NextFunction } from 'express'
import { authService } from './auth.service'
import { RegistrationDto } from './dto/registration.dto'
import { LoginDto } from './dto/login.dto'
import { ApiError } from '../exceptions/api-error'
import { AuthRequest } from '../interfaces/auth-request.interface'
import { User } from '../users/user.interface'

class AuthController {
  async registration(req: Request<{}, {}, RegistrationDto>, res: Response, next: NextFunction) {
    try {
      const { name, realName, password, roleId } = req.body
      if (!name || !realName || !password || !roleId) {
        throw ApiError.BadRequest('Заполните все поля')
      }

      const dto = new RegistrationDto(req.body)
      const user = await authService.registration(dto)
      return res.json({ message: 'Регистрация прошла успешно', user })
    } catch(e) {
      next(e)
    }
  }

  async login(req: Request<{}, {}, LoginDto>, res: Response, next: NextFunction) {
    try {
      const { name, password } = req.body
      if (!name || !password) {
        throw ApiError.BadRequest('Заполните все поля')
      }

      const dto = new LoginDto(req.body)
      const data = await authService.login(dto)
      return res.json(data)
    } catch(e) {
      next(e)
    }
  }

  async auth(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as User).id
      const user = await authService.auth(userId)
      return res.json({ user })
    } catch(e) {
      next(e)
    }
  }
}

export const authController = new AuthController()