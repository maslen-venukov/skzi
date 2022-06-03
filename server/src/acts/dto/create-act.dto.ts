import { RawAct } from '../act.interface'

type CreateActDtoParams = Omit<RawAct, 'id' | 'addDate'>

export class CreateActDto implements CreateActDtoParams {
  number: string
  date: Date
  eqInventoryNum?: string
  agreementId: number
  skziUnitId: number
  signTypeId: number
  addUserId: number

  constructor(params: CreateActDtoParams) {
    this.number = params.number
    this.date = params.date
    this.eqInventoryNum = params.eqInventoryNum
    this.agreementId = params.agreementId
    this.skziUnitId = params.skziUnitId
    this.signTypeId = params.signTypeId
    this.addUserId = params.addUserId
  }
}