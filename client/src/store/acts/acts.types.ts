import { Agreement } from '../agreements/agreements.types'
import { SkziUnit } from '../skzi-units/skzi-units.types'
import { Type } from '../../interfaces/type.interface'
import { User } from '../users/users.types'

export interface Act {
  id: number
  number: string
  date: Date
  addDate: Date
  agreement: Agreement
  skziUnit: SkziUnit
  signType: Type
  addUser: User
  eqInventoryNum?: string
}

export interface CreateActData {
  number: string
  date: Date
  agreementId: number
  skziUnitId: number
  signTypeId: number
  eqInventoryNum?: string
}

export interface UpdateActData extends Partial<CreateActData> {}