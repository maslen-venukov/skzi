import { VipnetLan } from '../vipnet-lans/vipnet-lan.interface'
import { Agreement } from '../agreements/agreement.interface'
import { User } from '../users/user.interface'
import { Org } from '../orgs/org.interface'
import { Type } from '../interfaces/type.interface'

interface CoreSkziUnit {
  id: number
  isActive: boolean
  invNum?: string
  serialNum?: string
  licSkziNum?: string
  serialSkziNum?: string
  isBroken: boolean
  location?: string
  addDate: Date
  inactDate?: Date
}

export interface RawSkziUnit extends CoreSkziUnit {
  vipnetLanId: number
  agreementId?: number
  skziTypeId: number
  platformTypeId?: number
  addUserId: number
  inactUserId?: number
  skziOwnerId?: number
}

export interface SkziUnit extends CoreSkziUnit {
  vipnetLan: VipnetLan
  agreement?: Agreement
  skziType: Type
  platformType?: Type
  addUser: User
  inactUser?: User
  skziOwner?: Org
}