import { HTTPStatusCodes } from '../enums/http-status-codes.enum'

export class ApiError {
  status: number
  message: string

  constructor(status: number, message: string) {
    this.status = status
    this.message = message
  }

  static BadRequest(message: string) {
    return new ApiError(HTTPStatusCodes.BadRequest, message)
  }

  static Unauthorized(message?: string) {
    return new ApiError(HTTPStatusCodes.Unauthorized, message || 'Не авторизован')
  }

  static Forbidden() {
    return new ApiError(HTTPStatusCodes.Forbidden, 'Нет доступа')
  }

  static NotFound(message: string) {
    return new ApiError(HTTPStatusCodes.NotFound, message)
  }
}