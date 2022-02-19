import { RawUser } from "../user.interface"

interface UpdateUserDtoParams {
  name?: string
  realName?: string
  passHash?: string
  roleId?: number
  isActive?: boolean
}

export class UpdateUserDto implements Partial<Omit<RawUser, 'id'>> {
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