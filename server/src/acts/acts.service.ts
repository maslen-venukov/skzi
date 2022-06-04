import { actsRepository } from './acts.repository'
import { actsTransform } from './acts.transform'
import { CreateActDto } from './dto/create-act.dto'
import { UpdateActDto } from './dto/update-act.dto'
import { PaginationDto } from '../dto/pagination.dto'
import { ApiError } from '../exceptions/api-error'

class ActsService {
  async getAll(filters = {}) {
    const acts = await actsRepository.getAll({ filters, sort: { id: 'desc' } })
    return await Promise.all(acts.map(actsTransform.expand))
  }

  async paginate(params: PaginationDto) {
    const { page, count } = params

    const { data, pagination } = await actsRepository.paginate({
      sort: { id: 'desc' },
      pagination: { page, count }
    })

    const acts = await Promise.all(data.map(actsTransform.expand))

    return { acts, ...pagination }
  }

  async getById(id: number) {
    const act = await actsRepository.getById(id)
    if(!act) {
      throw ApiError.NotFound('Акт не найден')
    }
    return await actsTransform.expand(act)
  }

  async create(dto: CreateActDto) {
    const act = await actsRepository.create(dto)
    return await actsTransform.expand(act)
  }

  async update(id: number, dto: UpdateActDto) {
    const act = await actsRepository.update(id, dto)
    if(!act) {
      throw ApiError.NotFound('Акт не найден')
    }
    return await actsTransform.expand(act)
  }

  async remove(id: number) {
    const isDeleted = await actsRepository.remove(id)
    if(!isDeleted) {
      throw ApiError.NotFound('Акт не найден')
    }
    return isDeleted
  }

  async count(filters = {}) {
    return await actsRepository.count(filters)
  }
}

export const actsService = new ActsService()