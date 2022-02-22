import { platformTypesRepository } from './platform-types.repository'
import { ApiError } from '../exceptions/api-error'

class PlatformTypesService {
  async getAll() {
    return await platformTypesRepository.getAll()
  }

  async getById(id: number) {
    const type = await platformTypesRepository.getById(id)
    if(!type) {
      throw ApiError.NotFound('Тип платформы не найден')
    }
    return type
  }
}

export const platformTypesService = new PlatformTypesService()