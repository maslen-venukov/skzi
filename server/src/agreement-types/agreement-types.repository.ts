import { Repository } from '../core/repository'
import { Type } from '../types'

class AgreementTypesRepository extends Repository<Type> {
  constructor() {
    super({
      table: 's_agreement_type',
      columns: [
        'id',
        'type'
      ]
    })
  }
}

export const agreementTypesRepository = new AgreementTypesRepository()