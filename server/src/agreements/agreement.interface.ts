import { Type } from '../types'
import { User } from '../users/user.interface'

interface CoreAgreement {
  id: number
  isActive: boolean
  number: number
  parentId?: number
  beginDate: Date
  endDate?: Date
  contractorNodeId: number
  contractorSegmentId?: number
  comment: string
  addDate: Date
  terminationDate?: Date
}

export interface RawAgreement extends CoreAgreement {
  typeId: number
  addUserId: number
}

export interface Agreement extends CoreAgreement {
  type: Type
  addUser: User
}