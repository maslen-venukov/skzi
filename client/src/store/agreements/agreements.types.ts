import { Org } from '../orgs/orgs.types'
import { Type } from '../../interfaces/Type'
import { User } from '../users/users.types'

export interface Agreement {
  id: number
  isActive: boolean
  number: string
  parentId?: number
  beginDate: Date
  endDate?: Date
  addDate: Date
  terminationDate?: Date
  contractorNode: Org
  contractorSegment?: Org
  type: Type
  addUser: User
}

export interface AgreementsState {
  isLoading: boolean
  agreements: Agreement[]
}

export interface GetAgreementsResponse {
  agreements: Agreement[]
}

export interface GetAgreementResponse {
  agreement: Agreement
}