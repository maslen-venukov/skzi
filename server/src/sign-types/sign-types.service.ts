import { signTypesRepository } from './sign-types.repository'
import { ApiError } from '../exceptions/api-error'

class SignTypesService {
  async getAll() {
    return await signTypesRepository.getAll()
  }

  async getById(id: number) {
    const type = await signTypesRepository.getById(id)
    if(!type) {
      throw ApiError.NotFound('Тип подписи не найден')
    }
    return type
  }
}

export const signTypesService = new SignTypesService()