import { Request, Response, NextFunction } from 'express'
import { AuthService } from './auth.service'
import { RegistrationDto } from './dto/registration.dto'
import { LoginDto } from './dto/login.dto'
import { ApiError } from '../exceptions/api-error'

export class AuthController {
  static async registration(req: Request<{}, {}, RegistrationDto>, res: Response, next: NextFunction) {
    try {
      const { name, realName, password, roleId } = req.body
      if (!name || !realName || !password || !roleId) {
        throw ApiError.BadRequest('Заполните все поля')
      }

      const dto = new RegistrationDto(req.body)
      const user = await AuthService.registration(dto)
      return res.json(user)
    } catch(e) {
      next(e)
    }
  }

  static async login(req: Request<{}, {}, LoginDto>, res: Response, next: NextFunction) {
    try {
      const { name, password } = req.body
      if (!name || !password) {
        throw ApiError.BadRequest('Заполните все поля')
      }

      const dto = new LoginDto(req.body)
      const data = await AuthService.login(dto, req)
      return res.json(data)
    } catch(e) {
      next(e)
    }
  }
}