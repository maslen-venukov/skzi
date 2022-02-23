import { Request, Response, NextFunction } from 'express'
import { agreementsService } from './agreements.service'
import { CreateAgreementDto } from './dto/create-agreement.dto'
import { UpdateAgreementDto } from './dto/update-agreement.dto'
import { ApiError } from '../exceptions/api-error'
import { AuthRequest } from '../interfaces/auth-request.interface'
import { User } from '../users/user.interface'

class AgreementsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const agreements = await agreementsService.getAll()
      return res.json({ agreements })
    } catch(e) {
      next(e)
    }
  }

  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const agreement = await agreementsService.getById(id)
      return res.json({ agreement })
    } catch(e) {
      next(e)
    }
  }

  async create(req: AuthRequest<{}, {}, Omit<CreateAgreementDto, 'addUserId'>>, res: Response, next: NextFunction) {
    try {
      const {
        typeId,
        number,
        beginDate,
        contractorNodeId,
        comment
      } = req.body

      if (!typeId || !number || !beginDate || !contractorNodeId || !comment) {
        throw ApiError.BadRequest('Заполните все поля')
      }

      const addUserId = (req.user as User).id

      const dto = new CreateAgreementDto({ ...req.body, addUserId })
      const agreement = await agreementsService.create(dto)
      return res.json({ message: 'Соглашение успешно создано', agreement })
    } catch(e) {
      next(e)
    }
  }

  async update(req: Request<{ id: string }, {}, UpdateAgreementDto>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const dto = new UpdateAgreementDto(req.body)
      const org = await agreementsService.update(id, dto)
      return res.json({ message: 'Соглашение успешно изменено', org })
    } catch(e) {
      next(e)
    }
  }

  async remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await agreementsService.remove(id)
      return res.json({ message: 'Соглашение успешно удалено' })
    } catch(e) {
      next(e)
    }
  }
}

export const agreementsController = new AgreementsController()