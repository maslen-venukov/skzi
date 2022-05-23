import { RawAgreement } from '../agreement.interface'

type CreateAgreementDtoParams = Omit<RawAgreement, 'id' | 'isActive' | 'addDate' | 'terminationDate'>

export class CreateAgreementDto implements CreateAgreementDtoParams {
  typeId: number
  number: string
  parentId?: number
  beginDate: Date
  endDate?: Date
  contractorNodeId: number
  contractorSegmentId?: number
  addUserId: number

  constructor(params: CreateAgreementDtoParams) {
    this.typeId = params.typeId
    this.number = params.number
    this.parentId = params.parentId
    this.beginDate = params.beginDate
    this.endDate = params.endDate
    this.contractorNodeId = params.contractorNodeId
    this.contractorSegmentId = params.contractorSegmentId
    this.addUserId = params.addUserId
  }
}