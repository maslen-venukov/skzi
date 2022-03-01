import { RawSkziUnit, SkziUnit } from './skzi-unit.interface'
import { vipnetLansService } from '../vipnet-lans/vipnet-lans.service'
import { agreementsService } from '../agreements/agreements.service'
import { skziTypesService } from '../skzi-types/skzi-types.service'
import { platformTypesService } from '../platform-types/platform-types.service'
import { usersService } from '../users/users.service'
import { orgsService } from '../orgs/orgs.service'

class SkziUnitsTransform {
  async expand(skziUnit: RawSkziUnit) {
    const { 
      vipnetLanId,
      agreementId,
      skziTypeId,
      platformId,
      addUserId,
      inactUserId,
      skziOwnerId,
      ...rest
    } = skziUnit

    const vipnetLan = await vipnetLansService.getById(vipnetLanId)
    const agreement = agreementId ? await agreementsService.getById(agreementId) : undefined
    const skziType = await skziTypesService.getById(skziTypeId)
    const platform = platformId ? await platformTypesService.getById(platformId) : undefined
    const addUser = await usersService.getById(addUserId)
    const inactUser = inactUserId ? await usersService.getById(inactUserId) : undefined
    const skziOwner = skziOwnerId ? await orgsService.getById(skziOwnerId) : undefined

    return {
      ...rest,
      vipnetLan,
      agreement,
      skziType,
      platform,
      addUser,
      inactUser,
      skziOwner
    } as SkziUnit
  }
}

export const skziUnitsTransform = new SkziUnitsTransform()