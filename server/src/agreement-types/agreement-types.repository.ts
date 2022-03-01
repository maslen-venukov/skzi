import { Repository } from '../core/repository'
import { Type } from '../interfaces/type.interface'

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