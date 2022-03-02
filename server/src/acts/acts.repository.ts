import { Repository } from '../core/repository'
import { RawAct } from './act.interface'

class ActsRepository extends Repository<RawAct> {
  constructor() {
    super({
      table: 'act',
      columns: [
        'id',
        'number',
        'agreementId',
        'date',
        'skziUnitId',
        'signTypeId',
        'addDate',
        'addUserId',
        'eqInventoryNum'
      ]
    })
  }
}

export const actsRepository = new ActsRepository()