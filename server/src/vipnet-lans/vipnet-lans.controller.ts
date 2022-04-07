import { Request, Response, NextFunction } from 'express'
import { vipnetLansService } from './vipnet-lans.service'

class VipnetLansController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const vipnetLans = await vipnetLansService.getAll()
      return res.json({ vipnetLans })
    } catch(e) {
      next(e)
    }
  }
}

export const vipnetLansController = new VipnetLansController()