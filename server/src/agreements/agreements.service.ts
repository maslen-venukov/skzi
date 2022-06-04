import { agreementsRepository } from './agreements.repository'
import { agreementsTransform } from './agreements.transform'
import { CreateAgreementDto } from './dto/create-agreement.dto'
import { UpdateAgreementDto } from './dto/update-agreement.dto'
import { PaginationDto } from '../dto/pagination.dto'
import { skziUnitsService } from '../skzi-units/skzi-units.service'
import { actsService } from '../acts/acts.service'
import { ApiError } from '../exceptions/api-error'

class AgreementsService {
  async paginate(params: PaginationDto) {
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
    const skziUnitsCount = await skziUnitsService.count({ agreementId: id })
    const actsCount = await actsService.count({ agreementId: id })

    if(skziUnitsCount || actsCount) {
      throw ApiError.BadRequest('Невозможно удалить соглашение, т.к. существуют связанные СКЗИ или акты')
    }

    const agreement = await agreementsRepository.getById(id)
    if(!agreement) {
      throw ApiError.NotFound('Соглашение не найдено')
    }

    if(agreement.parentId) {
      throw ApiError.BadRequest('Невозможно удалить соглашение, т.к. существует родительское соглашение')
    }

    const isDeleted = await agreementsRepository.remove(id)
    if(!isDeleted) {
      throw ApiError.NotFound('Соглашение не найдено')
    }

    return isDeleted
  }
}

export const agreementsService = new AgreementsService()