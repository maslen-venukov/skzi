interface LoginDtoParams {
  name: string
  password: string
}

export class LoginDto {
  name: string
  password: string

  constructor({ name, password }: LoginDtoParams) {
    this.name = name
    this.password = password
  }
}