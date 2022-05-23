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

  constructor(params: RegistrationDtoParams) {
    super(params)
    this.realName = params.realName
    this.roleId = params.roleId
  }
}