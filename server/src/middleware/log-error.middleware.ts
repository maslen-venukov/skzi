import { Request, Response, NextFunction } from 'express'
import logData from '../utils/logData'

const logErrorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  if(process.env.NODE_ENV === 'development') {
    return console.log(error)
  }

  return logData({
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

export default logErrorMiddleware