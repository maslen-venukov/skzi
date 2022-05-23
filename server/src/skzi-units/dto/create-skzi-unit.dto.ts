import { RawSkziUnit } from '../skzi-unit.interface'

type CreateSkziUnitDtoParams = Omit<RawSkziUnit, 'id' | 'isActive' | 'isBroken' | 'addDate' | 'inactDate' | 'inactUserId'>

export class CreateSkziUnitDto implements CreateSkziUnitDtoParams {
  invNum?: string
  serialNum?: string
  licSkziNum?: string
  serialSkziNum?: string
  location?: string
  vipnetLanId: number
  agreementId?: number
  skziTypeId: number
  platformTypeId?: number
  addUserId: number
  skziOwnerId?: number

  constructor(params: CreateSkziUnitDtoParams) {
    this.invNum = params.invNum
    this.serialNum = params.serialNum
    this.licSkziNum = params.licSkziNum
    this.serialSkziNum = params.serialSkziNum
    this.location = params.location
    this.vipnetLanId = params.vipnetLanId
    this.agreementId = params.agreementId
    this.skziTypeId = params.skziTypeId
    this.platformTypeId = params.platformTypeId
    this.addUserId = params.addUserId
    this.skziOwnerId = params.skziOwnerId
  }
}