import { Repository } from '../core/repository'
import { Type } from '../types'

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