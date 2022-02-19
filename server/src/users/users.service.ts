import { usersRepository } from './users.repository'
import { usersTransform } from './users.transform'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiError } from '../exceptions/api-error'

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

  async update(id: number, dto: UpdateUserDto) {
    const user = await usersRepository.update(id, dto, { exclude: ['passHash'] })
    return await usersTransform.expandWithRole(user)
  }

  async remove(id: number) {
    const isDeleted = await usersRepository.remove(id)
    if(!isDeleted) {
      throw ApiError.NotFound('Пользователь не найден')
    }
  }
}

export const usersService = new UsersService()