import bcrypt from 'bcrypt'
import { usersRepository } from './users.repository'
import { usersTransform } from './users.transform'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
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

  async remove(id: number) {
    const isDeleted = await usersRepository.remove(id)
    if(!isDeleted) {
      throw ApiError.NotFound('Пользователь не найден')
    }
    return isDeleted
  }
}

export const usersService = new UsersService()