import { RawSkziUnit } from '../skzi-unit.interface'

type UpdateSkziUnitDtoParams = Partial<Omit<RawSkziUnit, 'id' | 'addDate' | 'addUserId'>>

export class UpdateSkziUnitDto implements UpdateSkziUnitDtoParams {
  isActive?: boolean
  invNum?: string
  serialNum?: string
  licSkziNum?: string
  serialSkziNum?: string
  isBroken?: boolean
  location?: string
  inactDate?: Date
  vipnetLanId?: number
  agreementId?: number
  skziTypeId?: number
  platformTypeId?: number
  inactUserId?: number
  skziOwnerId?: number

  constructor(params: UpdateSkziUnitDtoParams) {
    this.isActive = params.isActive
    this.invNum = params.invNum
    this.serialNum = params.serialNum
    this.licSkziNum = params.licSkziNum
    this.serialSkziNum = params.serialSkziNum
    this.isBroken = params.isBroken
    this.location = params.location
    this.inactDate = params.inactDate
    this.vipnetLanId = params.vipnetLanId
    this.agreementId = params.agreementId
    this.skziTypeId = params.skziTypeId
    this.platformTypeId = params.platformTypeId
    this.inactUserId = params.inactUserId
    this.skziOwnerId = params.skziOwnerId
  }
}