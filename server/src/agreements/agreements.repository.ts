import { Repository } from '../core/repository'
import { RawAgreement } from './agreement.interface'

class AgreementsRepository extends Repository<RawAgreement> {
  constructor() {
    super({
      table: 'agreement',
      columns: [
        'id',
        'typeId',
        'isActive',
        'number',
        'parentId',
        'beginDate',
        'endDate',
        'contractorNodeId',
        'contractorSegmentId',
        'comment',
        'addUserId',
        'addDate',
        'terminationDate'
      ]
    })
  }
}

export const agreementsRepository = new AgreementsRepository()