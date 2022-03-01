import { Repository } from '../core/repository'
import { RawSkziUnit } from './skzi-unit.interface'

class SkziUnitsRepository extends Repository<RawSkziUnit> {
  constructor() {
    super({
      table: 'skzi_unit',
      columns: [
        'id',
        'isActive',
        'invNum',
        'lanId',
        'lanName',
        'serialNum',
        'licSkziNum',
        'serialSkziNum',
        'isBroken',
        'location',
        'addDate',
        'inactDate',
        'vipnetLanId',
        'agreementId',
        'skziTypeId',
        'platformId',
        'addUserId',
        'inactUserId',
        'skziOwnerId'
      ]
    })
  }
}

export const skziUnitsRepository = new SkziUnitsRepository()