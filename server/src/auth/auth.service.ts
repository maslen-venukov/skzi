import bcrypt from 'bcrypt'
import { usersRepository } from '../users/users.repository'
import { LoginDto } from './dto/login.dto'
import { tokenService } from '../token/token.service'
import { ApiError } from '../exceptions/api-error'
import { usersTransform } from '../users/users.transform'
import { User } from '../users/user.interface'

class AuthService {
  async login(dto: LoginDto) {
    const { name, password } = dto

    const user = await usersRepository.getOne({ name })
    if(!user) {
      throw ApiError.Unauthorized('Неверный логин или пароль')
    }

    const userWithRole = await usersTransform.expandWithRole(user)
    if(!userWithRole.isActive) {
      throw ApiError.Forbidden()
    }

    const { passHash, ...payload } = userWithRole as User & { passHash: string }

    const isCompared = await bcrypt.compare(password, passHash)
    if(!isCompared) {
      throw ApiError.Unauthorized('Неверный логин или пароль')
    }

    return { token: tokenService.generate(payload), user: payload }
  }

  async auth(userId: number) {
    const user = await usersRepository.getById(userId)
    if(!user) {
      throw ApiError.Unauthorized()
    }

    const userWithRole = await usersTransform.expandWithRole(user)
    if(!userWithRole.isActive) {
      throw ApiError.Forbidden()
    }

    const { passHash, ...payload } = userWithRole as User & { passHash: string }
    return payload
  }
}

export const authService = new AuthService()