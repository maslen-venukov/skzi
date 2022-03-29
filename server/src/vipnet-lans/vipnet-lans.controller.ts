import { Request, Response, NextFunction } from 'express'
import { vipnetLansService } from './vipnet-lans.service'

class VipnetLansController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await vipnetLansService.getAll()
      return res.json({ types })
    } catch(e) {
      next(e)
    }
  }
}

export const vipnetLansController = new VipnetLansController()