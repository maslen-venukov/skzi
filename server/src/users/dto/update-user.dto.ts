import { RawUser } from '../user.interface'

type UpdateUserDtoParams = Partial<Omit<RawUser, 'id'>>

export class UpdateUserDto implements UpdateUserDtoParams {
  name?: string
  realName?: string
  passHash?: string
  roleId?: number
  isActive?: boolean

  constructor(params: UpdateUserDtoParams) {
    this.name = params.name
    this.realName = params.realName
    this.passHash = params.passHash
    this.roleId = params.roleId
    this.isActive = params.isActive
  }
}