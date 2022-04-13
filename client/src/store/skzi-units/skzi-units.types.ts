import { Type } from '../../interfaces/type.interface'
import { Agreement } from '../agreements/agreements.types'
import { Org } from '../orgs/orgs.types'
import { User } from '../users/users.types'
import { VipnetLan } from '../vipnet-lans/vipnet-lans.types'

export interface SkziUnit {
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
  vipnetLan: VipnetLan
  agreement?: Agreement
  skziType: Type
  platformType?: Type
  addUser: User
  inactUser?: User
  skziOwner?: Org
}

export interface GetSkziUnitsParams {
  agreementId?: number
}

export interface CreateSkziUnitData {
  serialNum?: string
  invNum?: string
  licSkziNum?: string
  serialSkziNum?: string
  location?: string
  vipnetLanId: number
  agreementId?: number
  skziTypeId: number
  platformTypeId?: number
  skziOwnerId?: number
}

export interface UpdateSkziUnitData {
  isActive?: boolean
  invNum?: string
  serialNum?: string
  licSkziNum?: string
  serialSkziNum?: string
  isBroken?: boolean
  location?: string
  vipnetLanId?: number
  agreementId?: number
  skziTypeId?: number
  platformTypeId?: number
  skziOwnerId?: number
}