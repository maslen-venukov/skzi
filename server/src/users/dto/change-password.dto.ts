interface ChangePasswordDtoParams {
  old: string
  new: string
  repeat: string
}

export class ChangePasswordDto implements ChangePasswordDtoParams {
  old: string
  new: string
  repeat: string

  constructor(params: ChangePasswordDtoParams) {
    this.old = params.old
    this.new = params.new
    this.repeat = params.repeat
  }
}