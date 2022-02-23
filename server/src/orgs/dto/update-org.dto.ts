import { Org } from '../org.interface'

type UpdateOrgDtoParams = Partial<Omit<Org, 'id'>>

export class UpdateOrgDto implements UpdateOrgDtoParams {
  inn?: string
  name?: string
  isWorks?: boolean

  constructor({ inn, name, isWorks }: UpdateOrgDtoParams) {
    this.inn = inn
    this.name = name
    this.isWorks = isWorks
  }
}