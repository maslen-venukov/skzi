import { vipnetLansRepository } from './vipnet-lans.repository'
import { ApiError } from '../exceptions/api-error'

class VipnetLansService {
  async getAll() {
    return await vipnetLansRepository.getAll()
  }

  async getById(id: number) {
    const vipnetLan = await vipnetLansRepository.getById(id)
    if(!vipnetLan) {
      throw ApiError.NotFound('ViPNet LAN не найден')
    }
    return vipnetLan
  }
}

export const vipnetLansService = new VipnetLansService()