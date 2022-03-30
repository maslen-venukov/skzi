import { RawAct } from '../act.interface'

type CreateActDtoParams = Omit<RawAct, 'id' | 'addDate'>

export class CreateActDto implements CreateActDtoParams {
  number: number
  date: Date
  eqInventoryNum?: string
  agreementId: number
  skziUnitId: number
  signTypeId: number
  addUserId: number

  constructor({
    number,
    date,
    eqInventoryNum,
    agreementId,
    skziUnitId,
    signTypeId,
    addUserId
  }: CreateActDtoParams) {
    this.number = number
    this.date = date
    this.eqInventoryNum = eqInventoryNum
    this.agreementId = agreementId
    this.skziUnitId = skziUnitId
    this.signTypeId = signTypeId
    this.addUserId = addUserId
  }
}