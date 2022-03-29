import { Request, Response, NextFunction } from 'express'
import { platformTypesService } from './platform-types.service'

class PlatformTypesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await platformTypesService.getAll()
      return res.json({ types })
    } catch(e) {
      next(e)
    }
  }
}

export const platformTypesController = new PlatformTypesController()