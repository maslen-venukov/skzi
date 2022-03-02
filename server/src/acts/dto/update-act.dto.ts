import { RawAct } from '../act.interface'

type UpdateActDtoParams = Partial<Omit<RawAct, 'id' | 'addDate' | 'addUserId'>>

export class UpdateActDto implements UpdateActDtoParams {
  number?: string
  date?: Date
  eqInventoryNum?: string
  agreementId?: number
  skziUnitId?: number
  signTypeId?: number

  constructor({
    number,
    date,
    eqInventoryNum,
    agreementId,
    skziUnitId,
    signTypeId
  }: UpdateActDtoParams) {
    this.number = number
    this.date = date
    this.eqInventoryNum = eqInventoryNum
    this.agreementId = agreementId
    this.skziUnitId = skziUnitId
    this.signTypeId = signTypeId
  }
}