import { Router } from 'express'
import { actsController } from './acts.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import {
  adminRolesMiddleware,
  operatorRolesMiddleware,
  userRolesMiddleware
} from '../middleware/roles.middleware'

export const actsRouter = Router()

actsRouter.get('/', authMiddleware, userRolesMiddleware(), actsController.getAll)
actsRouter.get('/:id', authMiddleware, userRolesMiddleware(), actsController.getById)
actsRouter.post('/', authMiddleware, operatorRolesMiddleware(), actsController.create)
actsRouter.patch('/:id', authMiddleware, adminRolesMiddleware(), actsController.update)
actsRouter.delete('/:id', authMiddleware, adminRolesMiddleware(), actsController.remove)