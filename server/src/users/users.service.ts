import bcrypt from 'bcrypt'
import { usersRepository } from './users.repository'
import { usersTransform } from './users.transform'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { userRolesService } from '../user-roles/user-roles.service'
import { ApiError } from '../exceptions/api-error'
import { User } from './user.interface'

class UsersService {
  async getAll() {
    const users = await usersRepository.getAll({ sort: { id: 'desc' }, exclude: ['passHash'] })
    return await Promise.all(users.map(user => usersTransform.expandWithRole(user)))
  }

  async getById(id: number) {
    const user = await usersRepository.getById(id, { exclude: ['passHash'] })
    if(!user) {
      throw ApiError.NotFound('Пользователь не найден')
    }
    return await usersTransform.expandWithRole(user)
  }

  async create(dto: CreateUserDto) {
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
    const user = await usersRepository.create({
      name,
      realName,
      passHash: hash,
      roleId: role.id
    }, { exclude: ['passHash'] })

    return { ...user, role } as User
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await usersRepository.update(id, dto, { exclude: ['passHash'] })
    if(!user) {
      throw ApiError.NotFound('Пользователь не найден')
    }
    return await usersTransform.expandWithRole(user)
  }

  async changePassword(id: number, dto: ChangePasswordDto) {
    const user = await usersRepository.getById(id)
    if(!user) {
      throw ApiError.NotFound('Пользователь не найден')
    }

    if(dto.new !== dto.repeat) {
      throw ApiError.BadRequest('Пароли не совпадают')
    }

    const isCompared = await bcrypt.compare(dto.old, user.passHash)
    if(!isCompared) {
      throw ApiError.BadRequest('Неверный пароль')
    }

    const isRepeated = await bcrypt.compare(dto.new, user.passHash)
    if(isRepeated) {
      throw ApiError.BadRequest('Новый пароль должен отличаться от предыдущего')
    }

    const passHash = await bcrypt.hash(dto.new, 5)
    await usersRepository.update(id, { passHash })
  }

  async remove(id: number) {
    const isDeleted = await usersRepository.remove(id)
    if(!isDeleted) {
      throw ApiError.NotFound('Пользователь не найден')
    }
    return isDeleted
  }
}

export const usersService = new UsersService()