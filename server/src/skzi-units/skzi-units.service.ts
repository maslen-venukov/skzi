import { skziUnitsRepository } from './skzi-units.repository'
import { skziUnitsTransform } from './skzi-units.transform'
import { CreateSkziUnitDto } from './dto/create-skzi-unit.dto'
import { UpdateSkziUnitDto } from './dto/update-skzi-unit.dto'
import { ApiError } from '../exceptions/api-error'

class SkziUnitsService {
  async getAll(filters = {}) {
    const skziUnits = await skziUnitsRepository.getAll({ filters, sort: { id: 'desc' } })
    return await Promise.all(skziUnits.map(skziUnit => skziUnitsTransform.expand(skziUnit)))
  }

  async getById(id: number) {
    const skziUnit = await skziUnitsRepository.getById(id)
    if(!skziUnit) {
      throw ApiError.NotFound('СКЗИ не найдено')
    }
    return await skziUnitsTransform.expand(skziUnit)
  }

  async create(dto: CreateSkziUnitDto) {
    const skziUnit = await skziUnitsRepository.create(dto)
    return await skziUnitsTransform.expand(skziUnit)
  }

  async update(id: number, dto: UpdateSkziUnitDto) {
    const skziUnit = await skziUnitsRepository.update(id, dto)
    if(!skziUnit) {
      throw ApiError.NotFound('СКЗИ не найдено')
    }
    return await skziUnitsTransform.expand(skziUnit)
  }

  async remove(id: number) {
    const isDeleted = await skziUnitsRepository.remove(id)
    if(!isDeleted) {
      throw ApiError.NotFound('СКЗИ не найдено')
    }
    return isDeleted
  }
}

export const skziUnitsService = new SkziUnitsService()