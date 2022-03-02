import { RawAct, Act } from './act.interface'
import { agreementsService } from '../agreements/agreements.service'
import { skziUnitsService } from '../skzi-units/skzi-units.service'
import { signTypesService } from '../sign-types/sign-types.service'
import { usersService } from '../users/users.service'

class ActsTransform {
  async expand(act: RawAct) {
    const { agreementId, skziUnitId, signTypeId, addUserId, ...rest } = act

    const agreement = await agreementsService.getById(agreementId)
    const skziUnit = await skziUnitsService.getById(skziUnitId)
    const signType = await signTypesService.getById(signTypeId)
    const addUser = await usersService.getById(addUserId)

    return {
      ...rest,
      agreement,
      skziUnit,
      signType,
      addUser
    } as Act
  }
}

export const actsTransform = new ActsTransform()