import { Repository } from '../core/repository'
import { Type } from '../types'

class SignTypesRepository extends Repository<Type> {
  constructor() {
    super({
      table: 's_sign_type',
      columns: [
        'id',
        'type'
      ]
    })
  }
}

export const signTypesRepository = new SignTypesRepository()