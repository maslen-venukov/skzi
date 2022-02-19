import { usersRepository } from './users.repository'
import { usersTransform } from './users.transform'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiError } from '../exceptions/api-error'

class UsersService {
  async getAll() {
    const users = await usersRepository.getAll({ sort: { id: 'desc' }})
    return await Promise.all(users.map(user => usersTransform.expandUserWithRole(user)))
  }

  async getById(id: number) {
    const user = await usersRepository.getById(id)
    if(!user) {
      throw ApiError.NotFound('Пользователь не найден')
    }
    return await usersTransform.expandUserWithRole(user)
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await usersRepository.update(id, dto)
    return await usersTransform.expandUserWithRole(user)
  }

  async remove(id: number) {
    await usersRepository.remove(id)
  }
}

export const usersService = new UsersService()