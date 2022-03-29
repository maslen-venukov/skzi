import { Router } from 'express'
import { skziUnitsController } from './skzi-units.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import { adminRolesMiddleware, operatorRolesMiddleware } from '../middleware/roles.middleware'

export const skziUnitsRouter = Router()

skziUnitsRouter.get('/', authMiddleware, skziUnitsController.getAll)
skziUnitsRouter.get('/:id', authMiddleware, skziUnitsController.getById)
skziUnitsRouter.post('/', authMiddleware, operatorRolesMiddleware(), skziUnitsController.create)
skziUnitsRouter.patch('/:id', authMiddleware, adminRolesMiddleware(), skziUnitsController.update)
skziUnitsRouter.delete('/:id', authMiddleware, adminRolesMiddleware(), skziUnitsController.remove)