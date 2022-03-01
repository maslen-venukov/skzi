import { Repository } from '../core/repository'
import { Type } from '../interfaces/type.interface'

class SkziTypesRepository extends Repository<Type> {
  constructor() {
    super({
      table: 's_skzi_type',
      columns: [
        'id',
        'type'
      ]
    })
  }
}

export const skziTypesRepository = new SkziTypesRepository()