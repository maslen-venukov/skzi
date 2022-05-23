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
  terminationDate?: Date

  constructor(params: UpdateAgreementDtoParams) {
    this.typeId = params.typeId
    this.isActive = params.isActive
    this.number = params.number
    this.parentId = params.parentId
    this.beginDate = params.beginDate
    this.endDate = params.endDate
    this.contractorNodeId = params.contractorNodeId
    this.contractorSegmentId = params.contractorSegmentId
    this.terminationDate = params.terminationDate
  }
}