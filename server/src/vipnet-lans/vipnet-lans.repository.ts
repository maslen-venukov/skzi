import { Repository } from '../core/repository'
import { VipnetLan } from './vipnet-lan.interface'

class VipnetLansRepository extends Repository<VipnetLan> {
  constructor() {
    super({
      table: 's_vipnet_lan',
      columns: [
        'id',
        'lanNum'
      ]
    })
  }
}

export const vipnetLansRepository = new VipnetLansRepository()