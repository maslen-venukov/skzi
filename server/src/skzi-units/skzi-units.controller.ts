import { Request, Response, NextFunction } from 'express'
import { skziUnitsService } from './skzi-units.service'
import { CreateSkziUnitDto } from './dto/create-skzi-unit.dto'
import { UpdateSkziUnitDto } from './dto/update-skzi-unit.dto'
import { PaginationDto } from '../dto/pagination.dto'
import { actsService } from '../acts/acts.service'
import { ApiError } from '../exceptions/api-error'
import { AuthRequest } from '../interfaces/auth-request.interface'
import { User } from '../users/user.interface'

class SkziUnitsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new PaginationDto(req.query)
      const data = await skziUnitsService.paginate(dto)
      return res.json(data)
    } catch(e) {
      next(e)
    }
  }

  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const skziUnit = await skziUnitsService.getById(id)
      return res.json({ skziUnit })
    } catch(e) {
      next(e)
    }
  }

  async getActs(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const skziUnitId = Number(req.params.id)
      const acts = await actsService.getAll({ skziUnitId })
      return res.json({ acts })
    } catch(e) {
      next(e)
    }
  }

  async create(req: AuthRequest<{}, {}, Omit<CreateSkziUnitDto, 'addUserId'>>, res: Response, next: NextFunction) {
    try {
      const { vipnetLanId, skziTypeId } = req.body

      if (!vipnetLanId || !skziTypeId) {
        throw ApiError.BadRequest('Заполните все поля')
      }

      const addUserId = (req.user as User).id

      const dto = new CreateSkziUnitDto({ ...req.body, addUserId })
      const skziUnit = await skziUnitsService.create(dto)
      return res.json({ message: 'СКЗИ успешно добавлено', skziUnit })
    } catch(e) {
      next(e)
    }
  }

  async update(req: AuthRequest<{ id: string }, {}, UpdateSkziUnitDto>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const dto = new UpdateSkziUnitDto(req.body)

      const inactData: UpdateSkziUnitDto = {}
      if(dto.isActive === false) {
        inactData.inactDate = new Date()
        inactData.inactUserId = (req.user as User).id
      }

      const skziUnit = await skziUnitsService.update(id, { ...dto, ...inactData })
      return res.json({ message: 'СКЗИ успешно изменено', skziUnit })
    } catch(e) {
      next(e)
    }
  }

  async remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await skziUnitsService.remove(id)
      return res.json({ message: 'СКЗИ успешно удалено' })
    } catch(e) {
      next(e)
    }
  }
}

export const skziUnitsController = new SkziUnitsController()