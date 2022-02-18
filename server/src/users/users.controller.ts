import { Request, Response, NextFunction } from 'express'
import { UsersService } from './users.service'

export class UsersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UsersService.getAll()
      return res.json(users)
    } catch(e) {
      next(e)
    }
  }

  static async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const user = await UsersService.getById(Number(req.params.id))
      return res.json(user)
    } catch(e) {
      next(e)
    }
  }
}