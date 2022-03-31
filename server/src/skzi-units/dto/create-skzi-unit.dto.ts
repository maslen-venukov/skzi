import { RawSkziUnit } from '../skzi-unit.interface'

type CreateSkziUnitDtoParams = Omit<RawSkziUnit, 'id' | 'isActive' | 'addDate' | 'inactDate' | 'inactUserId'>

export class CreateSkziUnitDto implements CreateSkziUnitDtoParams {
  invNum?: string
  serialNum?: string
  licSkziNum?: string
  serialSkziNum?: string
  isBroken: boolean
  location?: string
  vipnetLanId: number
  agreementId?: number
  skziTypeId: number
  platformTypeId?: number
  addUserId: number
  skziOwnerId?: number

  constructor({
    invNum,
    serialNum,
    licSkziNum,
    serialSkziNum,
    isBroken,
    location,
    vipnetLanId,
    agreementId,
    skziTypeId,
    platformTypeId,
    addUserId,
    skziOwnerId
  }: CreateSkziUnitDtoParams) {
    this.invNum = invNum
    this.serialNum = serialNum
    this.licSkziNum = licSkziNum
    this.serialSkziNum = serialSkziNum
    this.isBroken = isBroken
    this.location = location
    this.vipnetLanId = vipnetLanId
    this.agreementId = agreementId
    this.skziTypeId = skziTypeId
    this.platformTypeId = platformTypeId
    this.addUserId = addUserId
    this.skziOwnerId = skziOwnerId
  }
}