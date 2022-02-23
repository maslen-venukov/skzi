import { Org } from '../org.interface'

type CreateOrgDtoParams = Omit<Org, 'id' | 'isWorks'>

export class CreateOrgDto implements CreateOrgDtoParams {
  inn: string
  name: string

  constructor({ inn, name }: CreateOrgDtoParams) {
    this.inn = inn
    this.name = name
  }
}