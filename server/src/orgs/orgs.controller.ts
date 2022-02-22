import { Request, Response, NextFunction } from 'express'
import { orgsService } from './orgs.service'
import { CreateOrgDto } from './dto/create-org.dto'
import { UpdateOrgDto } from './dto/update-org.dto'
import { ApiError } from '../exceptions/api-error'

class OrgsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orgs = await orgsService.getAll()
      return res.json({ orgs })
    } catch(e) {
      next(e)
    }
  }

  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const org = await orgsService.getById(id)
      return res.json({ org })
    } catch(e) {
      next(e)
    }
  }

  async create(req: Request<{}, {}, CreateOrgDto>, res: Response, next: NextFunction) {
    try {
      const { inn, name } = req.body
      if (!inn || !name) {
        throw ApiError.BadRequest('Заполните все поля')
      }

      const dto = new CreateOrgDto(req.body)
      const org = await orgsService.create(dto)
      return res.json({ message: 'Контрагент успешно создан', org })
    } catch(e) {
      next(e)
    }
  }

  async update(req: Request<{ id: string }, {}, UpdateOrgDto>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const dto = new UpdateOrgDto(req.body)
      const org = await orgsService.update(id, dto)
      return res.json({ message: 'Контрагент успешно изменен', org })
    } catch(e) {
      next(e)
    }
  }

  async remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await orgsService.remove(id)
      return res.json({ message: 'Контрагент успешно удален' })
    } catch(e) {
      next(e)
    }
  }
}

export const orgsController = new OrgsController()