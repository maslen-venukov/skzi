import { Agreement } from '../agreements/agreement.interface'
import { SkziUnit } from '../skzi-units/skzi-unit.interface'
import { Type } from '../interfaces/type.interface'
import { User } from '../users/user.interface'

interface CoreAct {
  id: number
  number: string
  date: Date
  addDate: Date
  eqInventoryNum?: string
}

export interface RawAct extends CoreAct {
  agreementId: number
  skziUnitId: number
  signTypeId: number
  addUserId: number
}

export interface Act extends CoreAct {
  agreement: Agreement
  skziUnit: SkziUnit
  signType: Type
  addUser: User
}