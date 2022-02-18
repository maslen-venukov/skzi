import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/api-error'
import { HTTPStatusCodes } from '../enums/http-status-codes.enum'

const sendErrorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  if(error instanceof ApiError) {
    const { status, message } = error
    return res.status(status).json({ message })
  }
  res.status(HTTPStatusCodes.InternalServerError).json({ message: 'Что-то пошло не так' })
  next(error)
}

export default sendErrorMiddleware