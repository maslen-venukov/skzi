import { Org } from '../orgs/orgs.types'
import { Type } from '../../interfaces/type.interface'
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

export interface CreateAgreementData {
  typeId: number
  number: string
  parentId?: number
  beginDate: Date
  endDate?: Date
  contractorNodeId: number
  contractorSegmentId?: number
}

export interface UpdateAgreementData extends Partial<CreateAgreementData> {
  isActive?: boolean
  terminationDate?: Date
}