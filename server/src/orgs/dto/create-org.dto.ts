import { Org } from '../org.interface'

interface CreateOrgDtoParams {
  inn: string
  name: string
}

export class CreateOrgDto implements Omit<Org, 'id' | 'isWorks'> {
  inn: string
  name: string

  constructor({ inn, name }: CreateOrgDtoParams) {
    this.inn = inn
    this.name = name
  }
}