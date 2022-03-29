import { Router } from 'express'
import { actsController } from './acts.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import { adminRolesMiddleware, operatorRolesMiddleware } from '../middleware/roles.middleware'

export const actsRouter = Router()

actsRouter.get('/', authMiddleware, actsController.getAll)
actsRouter.get('/:id', authMiddleware, actsController.getById)
actsRouter.post('/', authMiddleware, operatorRolesMiddleware(), actsController.create)
actsRouter.patch('/:id', authMiddleware, adminRolesMiddleware(), actsController.update)
actsRouter.delete('/:id', authMiddleware, adminRolesMiddleware(), actsController.remove)