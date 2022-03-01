import { Router } from 'express'
import { skziUnitsController } from './skzi-units.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import { adminRolesMiddleware } from '../middleware/roles.middleware'

export const skziUnitsRouter = Router()

skziUnitsRouter.get('/', authMiddleware, adminRolesMiddleware(), skziUnitsController.getAll)
skziUnitsRouter.get('/:id', authMiddleware, adminRolesMiddleware(), skziUnitsController.getById)
skziUnitsRouter.post('/', authMiddleware, adminRolesMiddleware(), skziUnitsController.create)
skziUnitsRouter.patch('/:id', authMiddleware, adminRolesMiddleware(), skziUnitsController.update)
skziUnitsRouter.delete('/:id', authMiddleware, adminRolesMiddleware(), skziUnitsController.remove)