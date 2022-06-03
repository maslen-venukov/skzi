import { Request, Response, NextFunction } from 'express'
import { actsService } from './acts.service'
import { CreateActDto } from './dto/create-act.dto'
import { UpdateActDto } from './dto/update-act.dto'
import { PaginationDto } from '../dto/pagination.dto'
import { ApiError } from '../exceptions/api-error'
import { AuthRequest } from '../interfaces/auth-request.interface'
import { User } from '../users/user.interface'

class ActsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new PaginationDto(req.query)
      const data = await actsService.paginate(dto)
      return res.json(data)
    } catch(e) {
      next(e)
    }
  }

  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const act = await actsService.getById(id)
      return res.json({ act })
    } catch(e) {
      next(e)
    }
  }

  async create(req: AuthRequest<{}, {}, Omit<CreateActDto, 'addUserId'>>, res: Response, next: NextFunction) {
    try {
      const {
        number,
        date,
        agreementId,
        skziUnitId,
        signTypeId
      } = req.body

      if (!number || !date || !agreementId || !skziUnitId || !signTypeId) {
        throw ApiError.BadRequest('Заполните все поля')
      }

      const addUserId = (req.user as User).id

      const dto = new CreateActDto({ ...req.body, addUserId })
      const act = await actsService.create(dto)
      return res.json({ message: 'Акт успешно создан', act })
    } catch(e) {
      next(e)
    }
  }

  async update(req: Request<{ id: string }, {}, UpdateActDto>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const dto = new UpdateActDto(req.body)
      const act = await actsService.update(id, dto)
      return res.json({ message: 'Акт успешно изменен', act })
    } catch(e) {
      next(e)
    }
  }

  async remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await actsService.remove(id)
      return res.json({ message: 'Акт успешно удален' })
    } catch(e) {
      next(e)
    }
  }
}

export const actsController = new ActsController()