import { Request, Response, NextFunction } from 'express'
import { agreementTypesService } from './agreement-types.service'

class AgreementTypesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await agreementTypesService.getAll()
      return res.json({ types })
    } catch(e) {
      next(e)
    }
  }
}

export const agreementTypesController = new AgreementTypesController()