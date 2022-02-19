import { Request } from 'express'
import bcrypt from 'bcrypt'
import { usersRepository } from '../users/users.repository'
import { User } from '../users/user.interface'
import { RegistrationDto } from './dto/registration.dto'
import { LoginDto } from './dto/login.dto'
import { userRolesService } from '../user-roles/user-roles.service'
import { tokenService } from '../token/token.service'
import { ApiError } from '../exceptions/api-error'
import { usersTransform } from '../users/users.transform'
import { logData } from '../utils/logData'

class AuthService {
  async registration(dto: RegistrationDto) {
    const { name, realName } = dto

    const candidate = await usersRepository.getOne({ name })
    if(candidate) {
      throw ApiError.NotFound(`Пользователь с именем '${name}' уже существует`)
    }

    const role = await userRolesService.getById(dto.roleId)
    if(!role) {
      throw ApiError.NotFound('Роль не найдена')
    }

    const hash = await bcrypt.hash(dto.password, 5)
    const { roleId, passHash, ...rest } = await usersRepository.create({
      name,
      realName,
      passHash: hash,
      roleId: role.id
    })
    return { ...rest, role } as User
  }

  async login(dto: LoginDto) {
    const { name, password } = dto

    const user = await usersRepository.getOne({ name })
    if(!user) {
      throw ApiError.Unauthorized('Неверный логин или пароль')
    }

    const payload = await usersTransform.expandUserWithRole(user)
    if(!payload.isActive) {
      throw ApiError.Forbidden()
    }

    const isCompared = await bcrypt.compare(password, user.passHash)
    if(!isCompared) {
      throw ApiError.Unauthorized('Неверный логин или пароль')
    }

    return { token: tokenService.generate(payload), user: payload }
  }
}

export const authService = new AuthService()