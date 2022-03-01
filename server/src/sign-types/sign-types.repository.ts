import { Repository } from '../core/repository'
import { Type } from '../interfaces/type.interface'

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