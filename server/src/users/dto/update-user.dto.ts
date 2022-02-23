import { RawUser } from '../user.interface'

type UpdateUserDtoParams = Partial<Omit<RawUser, 'id'>>

export class UpdateUserDto implements UpdateUserDtoParams {
  name?: string
  realName?: string
  passHash?: string
  roleId?: number
  isActive?: boolean

  constructor({ name, realName, passHash, roleId, isActive }: UpdateUserDtoParams) {
    this.name = name
    this.realName = realName
    this.passHash = passHash
    this.roleId = roleId
    this.isActive = isActive
  }
}