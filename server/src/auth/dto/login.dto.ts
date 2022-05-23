interface LoginDtoParams {
  name: string
  password: string
}

export class LoginDto {
  name: string
  password: string

  constructor(params: LoginDtoParams) {
    this.name = params.name
    this.password = params.password
  }
}