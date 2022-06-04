import { LoginDto } from '../../auth/dto/login.dto'

interface CreateUserDtoParams {
  name: string
  realName: string
  password: string
  roleId: number
}

export class CreateUserDto extends LoginDto {
  realName: string
  roleId: number

  constructor(params: CreateUserDtoParams) {
    super(params)
    this.realName = params.realName
    this.roleId = params.roleId
  }
}