import { RawAgreement, Agreement } from './agreement.interface'
import { orgsService } from '../orgs/orgs.service'
import { agreementTypesService } from '../agreement-types/agreement-types.service'
import { usersService } from '../users/users.service'

class AgreementsTransform {
  async expand(agreement: RawAgreement) {
    const { contractorNodeId, contractorSegmentId, typeId, addUserId, ...rest } = agreement

    const contractorNode = await orgsService.getById(contractorNodeId)
    const contractorSegment = contractorSegmentId ? await orgsService.getById(contractorSegmentId) : undefined
    const type = await agreementTypesService.getById(typeId)
    const addUser = await usersService.getById(addUserId)

    return {
      ...rest,
      contractorNode,
      contractorSegment,
      type,
      addUser
    } as Agreement
  }
}

export const agreementsTransform = new AgreementsTransform()