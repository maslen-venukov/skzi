import { Org } from '../orgs/org.interface'
import { Type } from '../interfaces/type.interface'
import { User } from '../users/user.interface'

interface CoreAgreement {
  id: number
  isActive: boolean
  number: string
  parentId?: number
  beginDate: Date
  endDate?: Date
  comment: string
  addDate: Date
  terminationDate?: Date
}

export interface RawAgreement extends CoreAgreement {
  contractorNodeId: number
  contractorSegmentId?: number
  typeId: number
  addUserId: number
}

export interface Agreement extends CoreAgreement {
  contractorNode: Org
  contractorSegment?: Org
  type: Type
  addUser: User
}