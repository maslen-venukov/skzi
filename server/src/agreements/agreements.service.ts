import { agreementsRepository } from './agreements.repository'
import { agreementsTransform } from './agreements.transform'
import { CreateAgreementDto } from './dto/create-agreement.dto'
import { UpdateAgreementDto } from './dto/update-agreement.dto'
import { PaginationDto } from '../dto/pagination.dto'
import { ApiError } from '../exceptions/api-error'

class AgreementsService {
  async getAll(params: PaginationDto) {
    const { page, count } = params

    const { data, pagination } = await agreementsRepository.paginate({
      sort: { id: 'desc' },
      pagination: { page, count }
    })

    const agreements = await Promise.all(data.map(agreementsTransform.expand))

    return { agreements, ...pagination }
  }

  async getById(id: number) {
    const agreement = await agreementsRepository.getById(id)
    if(!agreement) {
      throw ApiError.NotFound('Соглашение не найдено')
    }
    return await agreementsTransform.expand(agreement)
  }

  async create(dto: CreateAgreementDto) {
    const agreement = await agreementsRepository.create(dto)
    return await agreementsTransform.expand(agreement)
  }

  async update(id: number, dto: UpdateAgreementDto) {
    const agreement = await agreementsRepository.update(id, dto)
    if(!agreement) {
      throw ApiError.NotFound('Соглашение не найдено')
    }
    return await agreementsTransform.expand(agreement)
  }

  async remove(id: number) {
    const isDeleted = await agreementsRepository.remove(id)
    if(!isDeleted) {
      throw ApiError.NotFound('Соглашение не найдено')
    }
    return isDeleted
  }
}

export const agreementsService = new AgreementsService()