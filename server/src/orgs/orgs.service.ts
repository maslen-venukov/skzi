import { orgsRepository } from './orgs.repository'
import { CreateOrgDto } from './dto/create-org.dto'
import { UpdateOrgDto } from './dto/update-org.dto'
import { ApiError } from '../exceptions/api-error'

class OrgsService {
  async getAll() {
    return await orgsRepository.getAll({ sort: { id: 'desc' } })
  }

  async getById(id: number) {
    const org = await orgsRepository.getById(id)
    if(!org) {
      throw ApiError.NotFound('Контрагент не найден')
    }
    return org
  }

  async create(dto: CreateOrgDto) {
    return await orgsRepository.create(dto)
  }

  async update(id: number, dto: UpdateOrgDto) {
    const org = await orgsRepository.update(id, dto)
    if(!org) {
      throw ApiError.NotFound('Контрагент не найден')
    }
    return org
  }

  async remove(id: number) {
    const isDeleted = await orgsRepository.remove(id)
    if(!isDeleted) {
      throw ApiError.NotFound('Контрагент не найден')
    }
    return isDeleted
  }
}

export const orgsService = new OrgsService()