import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const logErrorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  if(process.env.NODE_ENV === 'development') {
    return console.log(error)
  }

  return logger.log({
    fileName: 'errors',
    data: {
      error: {
        ...error,
        message: error.message
      }
    },
    req
  })
}