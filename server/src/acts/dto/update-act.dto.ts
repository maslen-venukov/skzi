import { RawAct } from '../act.interface'

type UpdateActDtoParams = Partial<Omit<RawAct, 'id' | 'addDate' | 'addUserId'>>

export class UpdateActDto implements UpdateActDtoParams {
  number?: number
  date?: Date
  eqInventoryNum?: string
  agreementId?: number
  skziUnitId?: number
  signTypeId?: number

  constructor(params: UpdateActDtoParams) {
    this.number = params.number
    this.date = params.date
    this.eqInventoryNum = params.eqInventoryNum
    this.agreementId = params.agreementId
    this.skziUnitId = params.skziUnitId
    this.signTypeId = params.signTypeId
  }
}