import { Org } from '../org.interface'

interface UpdateOrgDtoParams {
  inn?: string
  name?: string
  isWorks?: boolean
}

export class UpdateOrgDto implements Partial<Omit<Org, 'id'>> {
  inn?: string
  name?: string
  isWorks?: boolean

  constructor({ inn, name, isWorks }: UpdateOrgDtoParams) {
    this.inn = inn
    this.name = name
    this.isWorks = isWorks
  }
}