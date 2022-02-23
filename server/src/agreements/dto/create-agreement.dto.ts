import { RawAgreement } from '../agreement.interface'

type CreateAgreementDtoParams = Omit<RawAgreement, 'id' | 'isActive' | 'addDate'>

export class CreateAgreementDto implements CreateAgreementDtoParams {
  typeId: number
  number: number
  parentId?: number
  beginDate: Date
  endDate?: Date
  contractorNodeId: number
  contractorSegmentId?: number
  comment: string
  addUserId: number
  terminationDate?: Date

  constructor({
    typeId,
    number,
    parentId,
    beginDate,
    endDate,
    contractorNodeId,
    contractorSegmentId,
    comment,
    addUserId,
    terminationDate
  }: CreateAgreementDtoParams) {
    this.typeId = typeId
    this.number = number
    this.parentId = parentId
    this.beginDate = beginDate
    this.endDate = endDate
    this.contractorNodeId = contractorNodeId
    this.contractorSegmentId = contractorSegmentId
    this.comment = comment
    this.addUserId = addUserId
    this.terminationDate = terminationDate
  }
}