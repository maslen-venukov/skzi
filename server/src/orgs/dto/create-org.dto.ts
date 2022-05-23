import { Org } from '../org.interface'

type CreateOrgDtoParams = Omit<Org, 'id' | 'isWorks'>

export class CreateOrgDto implements CreateOrgDtoParams {
  inn: string
  name: string

  constructor(params: CreateOrgDtoParams) {
    this.inn = params.inn
    this.name = params.name
  }
}