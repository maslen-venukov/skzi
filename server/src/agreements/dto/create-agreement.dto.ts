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

  constructor({
    typeId,
    number,
    parentId,
    beginDate,
    endDate,
    contractorNodeId,
    contractorSegmentId,
    addUserId
  }: CreateAgreementDtoParams) {
    this.typeId = typeId
    this.number = number
    this.parentId = parentId
    this.beginDate = beginDate
    this.endDate = endDate
    this.contractorNodeId = contractorNodeId
    this.contractorSegmentId = contractorSegmentId
    this.addUserId = addUserId
  }
}