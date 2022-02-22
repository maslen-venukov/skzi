import { agreementTypesRepository } from './agreement-types.repository'
import { ApiError } from '../exceptions/api-error'

class AgreementTypesService {
  async getAll() {
    return await agreementTypesRepository.getAll()
  }

  async getById(id: number) {
    const type = await agreementTypesRepository.getById(id)
    if(!type) {
      throw ApiError.NotFound('Тип соглашения не найден')
    }
    return type
  }
}

export const agreementTypesService = new AgreementTypesService()