import { actsRepository } from './acts.repository'
import { actsTransform } from './acts.transform'
import { CreateActDto } from './dto/create-act.dto'
import { UpdateActDto } from './dto/update-act.dto'
import { ApiError } from '../exceptions/api-error'

class ActsService {
  async getAll() {
    const acts = await actsRepository.getAll({ sort: { id: 'desc' } })
    return await Promise.all(acts.map(actsTransform.expand))
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
}

export const actsService = new ActsService()