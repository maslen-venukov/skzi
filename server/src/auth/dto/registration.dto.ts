import { LoginDto } from './login.dto'

interface RegistrationDtoParams {
  name: string
  realName: string
  password: string
  roleId: number
}

export class RegistrationDto extends LoginDto {
  realName: string
  roleId: number

  constructor({ name, realName, password, roleId }: RegistrationDtoParams) {
    super({ name, password })
    this.realName = realName
    this.roleId = roleId
  }
}