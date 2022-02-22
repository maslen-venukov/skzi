import { skziTypesRepository } from './skzi-types.repository'
import { ApiError } from '../exceptions/api-error'

class SkziTypesService {
  async getAll() {
    return await skziTypesRepository.getAll()
  }

  async getById(id: number) {
    const type = await skziTypesRepository.getById(id)
    if(!type) {
      throw ApiError.NotFound('Тип СКЗИ не найден')
    }
    return type
  }
}

export const skziTypesService = new SkziTypesService()