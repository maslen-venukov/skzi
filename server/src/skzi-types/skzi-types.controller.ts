import { Request, Response, NextFunction } from 'express'
import { skziTypesService } from './skzi-types.service'

class SkziTypesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await skziTypesService.getAll()
      return res.json({ types })
    } catch(e) {
      next(e)
    }
  }
}

export const skziTypesController = new SkziTypesController()