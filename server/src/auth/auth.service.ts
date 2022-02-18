import { Request } from 'express'
import bcrypt from 'bcrypt'
import { UsersRepository } from '../users/users.repository'
import { User } from '../users/user.interface'
import { RegistrationDto } from './dto/registration.dto'
import { LoginDto } from './dto/login.dto'
import { UserRolesService } from '../user-roles/user-roles.service'
import { TokenService } from '../token/token.service'
import { ApiError } from '../exceptions/api-error'
import { UsersTransform } from '../users/users.transform'
import logData from '../utils/logData'

export class AuthService {
  static async registration(dto: RegistrationDto) {
    const { name, realName } = dto

    const candidate = await UsersRepository.getOne({ name })
    if(candidate) {
      throw ApiError.NotFound(`Пользователь с именем '${name}' уже существует`)
    }

    const role = await UserRolesService.getById(dto.roleId)
    if(!role) {
      throw ApiError.NotFound('Роль не найдена')
    }

    const hash = await bcrypt.hash(dto.password, 5)
    const { roleId, passHash, ...rest } = await UsersRepository.create({
      name,
      realName,
      passHash: hash,
      roleId: role.id
    })
    return { ...rest, role } as User
  }

  static async login(dto: LoginDto, req: Request) {
    const { name, password } = dto

    const user = await UsersRepository.getOne({ name })
    if(!user) {
      throw ApiError.Unauthorized('Неверный логин или пароль')
    }

    const payload = await UsersTransform.expandUserWithRole(user)
    if(!payload.isActive) {
      if(process.env.NODE_ENV === 'production') {
        logData({ fileName: 'blocked', data: { user: payload }, req })
      }
      throw ApiError.Forbidden()
    }

    const isCompared = await bcrypt.compare(password, user.passHash)
    if(!isCompared) {
      throw ApiError.Unauthorized('Неверный логин или пароль')
    }

    return { token: TokenService.generate(payload), user: payload }
  }
}