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

  constructor({
    isActive,
    invNum,
    serialNum,
    licSkziNum,
    serialSkziNum,
    isBroken,
    location,
    inactDate,
    vipnetLanId,
    agreementId,
    skziTypeId,
    platformTypeId,
    inactUserId,
    skziOwnerId
  }: UpdateSkziUnitDtoParams) {
    this.isActive = isActive
    this.invNum = invNum
    this.serialNum = serialNum
    this.licSkziNum = licSkziNum
    this.serialSkziNum = serialSkziNum
    this.isBroken = isBroken
    this.location = location
    this.inactDate = inactDate
    this.vipnetLanId = vipnetLanId
    this.agreementId = agreementId
    this.skziTypeId = skziTypeId
    this.platformTypeId = platformTypeId
    this.inactUserId = inactUserId
    this.skziOwnerId = skziOwnerId
  }
}