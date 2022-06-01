import { Request, Response, NextFunction } from 'express'
import { agreementsService } from './agreements.service'
import { GetAllAgreementsDto } from './dto/get-all-agreements.dto'
import { CreateAgreementDto } from './dto/create-agreement.dto'
import { UpdateAgreementDto } from './dto/update-agreement.dto'
import { skziUnitsService } from '../skzi-units/skzi-units.service'
import { ApiError } from '../exceptions/api-error'
import { AuthRequest } from '../interfaces/auth-request.interface'
import { User } from '../users/user.interface'

class AgreementsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new GetAllAgreementsDto(req.query)
      const data = await agreementsService.getAll(dto)
      return res.json(data)
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

  async getSkziUnits(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const agreementId = Number(req.params.id)
      const skziUnits = await skziUnitsService.getAll({ agreementId })
      return res.json({ skziUnits })
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
        contractorNodeId
      } = req.body

      if (!typeId || !number || !beginDate || !contractorNodeId) {
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

      const endData: UpdateAgreementDto = {}
      if(dto.isActive === false) {
        const old = await agreementsService.getById(id)
        if(!old.endDate && !dto.endDate) {
          endData.endDate = new Date()
        }
      }

      const agreement = await agreementsService.update(id, { ...dto, ...endData })
      return res.json({ message: 'Соглашение успешно изменено', agreement })
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