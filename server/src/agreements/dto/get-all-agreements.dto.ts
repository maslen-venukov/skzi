import { ParsedQs } from 'qs'

export class GetAllAgreementsDto {
  page: number
  count: number

  constructor(params: ParsedQs) {
    this.page = Number(params.page)
    this.count = Number(params.count)
  }
}