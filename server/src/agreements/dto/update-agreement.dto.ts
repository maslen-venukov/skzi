import { RawAgreement } from '../agreement.interface'

type UpdateAgreementDtoParams = Partial<Omit<RawAgreement, 'id' | 'addDate' | 'addUserId'>>

export class UpdateAgreementDto implements UpdateAgreementDtoParams {
  typeId?: number
  isActive?: boolean
  number?: string
  parentId?: number
  beginDate?: Date
  endDate?: Date
  contractorNodeId?: number
  contractorSegmentId?: number
  comment?: string
  terminationDate?: Date

  constructor({
    typeId,
    isActive,
    number,
    parentId,
    beginDate,
    endDate,
    contractorNodeId,
    contractorSegmentId,
    comment,
    terminationDate
  }: UpdateAgreementDtoParams) {
    this.typeId = typeId
    this.isActive = isActive
    this.number = number
    this.parentId = parentId
    this.beginDate = beginDate
    this.endDate = endDate
    this.contractorNodeId = contractorNodeId
    this.contractorSegmentId = contractorSegmentId
    this.comment = comment
    this.terminationDate = terminationDate
  }
}