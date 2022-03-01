import { Repository } from '../core/repository'
import { Type } from '../interfaces/type.interface'

class PlatformTypesRepository extends Repository<Type> {
  constructor() {
    super({
      table: 's_platform_type',
      columns: [
        'id',
        'type'
      ]
    })
  }
}

export const platformTypesRepository = new PlatformTypesRepository()