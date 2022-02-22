import { Repository } from '../core/repository'
import { Org } from './org.interface'

class OrgsRepository extends Repository<Org> {
  constructor() {
    super({
      table: 'org',
      columns: [
        'id',
        'inn',
        'name',
        'isWorks'
      ]
    })
  }
}

export const orgsRepository = new OrgsRepository()