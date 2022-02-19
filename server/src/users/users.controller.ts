import { Request, Response, NextFunction } from 'express'
import { usersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'

class UsersController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await usersService.getAll()
      return res.json({ users })
    } catch(e) {
      next(e)
    }
  }

  async getById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const user = await usersService.getById(id)
      return res.json({ user })
    } catch(e) {
      next(e)
    }
  }

  async update(req: Request<{ id: string }, {}, UpdateUserDto>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      const dto = new UpdateUserDto(req.body)
      const user = await usersService.update(id, dto)
      return res.json({ message: 'Пользователь успешно изменен', user })
    } catch(e) {
      next(e)
    }
  }

  async remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await usersService.remove(id)
      return res.json({ message: 'Пользователь успешно удален' })
    } catch(e) {
      next(e)
    }
  }
}

export const usersController = new UsersController()