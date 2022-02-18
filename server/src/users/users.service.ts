import { UsersRepository } from './users.repository'
import { UsersTransform } from './users.transform'
import { ApiError } from '../exceptions/api-error'

export class UsersService {
  static async getAll() {
    const users = await UsersRepository.getAll()
    return await Promise.all(users.map(user => UsersTransform.expandUserWithRole(user)))
  }

  static async getById(id: number) {
    const user = await UsersRepository.getById(id)
    if(!user) {
      throw ApiError.NotFound('Пользователь не найден')
    }
    return await UsersTransform.expandUserWithRole(user)
  }

  // TODO сделать сортировки по id при выборке
  // TODO сделать общий класс Repository
}