import { Request, Response, NextFunction } from 'express'
import { signTypesService } from './sign-types.service'

class SignTypesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await signTypesService.getAll()
      return res.json({ types })
    } catch(e) {
      next(e)
    }
  }
}

export const signTypesController = new SignTypesController()