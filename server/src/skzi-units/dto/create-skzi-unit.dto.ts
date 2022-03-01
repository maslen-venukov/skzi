import { RawSkziUnit } from '../skzi-unit.interface'

type CreateSkziUnitDtoParams = Omit<RawSkziUnit, 'id' | 'isActive' | 'addDate'>

export class CreateSkziUnitDto implements CreateSkziUnitDtoParams {
  invNum?: string
  lanId: string
  lanName: string
  serialNum?: string
  licSkziNum?: string
  serialSkziNum?: string
  isBroken: boolean
  location?: string
  inactDate?: Date
  vipnetLanId: number
  agreementId?: number
  skziTypeId: number
  platformId?: number
  addUserId: number
  inactUserId?: number
  skziOwnerId?: number

  constructor({
    invNum,
    lanId,
    lanName,
    serialNum,
    licSkziNum,
    serialSkziNum,
    isBroken,
    location,
    inactDate,
    vipnetLanId,
    agreementId,
    skziTypeId,
    platformId,
    addUserId,
    inactUserId,
    skziOwnerId
  }: CreateSkziUnitDtoParams) {
    this.invNum = invNum
    this.lanId = lanId
    this.lanName = lanName
    this.serialNum = serialNum
    this.licSkziNum = licSkziNum
    this.serialSkziNum = serialSkziNum
    this.isBroken = isBroken
    this.location = location
    this.inactDate = inactDate
    this.vipnetLanId = vipnetLanId
    this.agreementId = agreementId
    this.skziTypeId = skziTypeId
    this.platformId = platformId
    this.addUserId = addUserId
    this.inactUserId = inactUserId
    this.skziOwnerId = skziOwnerId
  }
}