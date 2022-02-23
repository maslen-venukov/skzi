import { RawAgreement, Agreement } from './agreement.interface'
import { agreementTypesService } from '../agreement-types/agreement-types.service'
import { usersService } from '../users/users.service'

class AgreementsTransform {
  async expand(agreement: RawAgreement) {
    const { typeId, addUserId, ...rest } = agreement

    const type = await agreementTypesService.getById(typeId)
    const addUser = await usersService.getById(addUserId)

    return {
      ...rest,
      type,
      addUser
    } as Agreement
  }
}

export const agreementsTransform = new AgreementsTransform()