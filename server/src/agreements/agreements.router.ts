import { Router } from 'express'
import { agreementsController } from './agreements.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import {
  adminRolesMiddleware,
  operatorRolesMiddleware,
  userRolesMiddleware
} from '../middleware/roles.middleware'

export const agreementsRouter = Router()

agreementsRouter.get('/', authMiddleware, userRolesMiddleware(), agreementsController.getAll)
agreementsRouter.get('/:id', authMiddleware, userRolesMiddleware(), agreementsController.getById)
agreementsRouter.post('/', authMiddleware, operatorRolesMiddleware(), agreementsController.create)
agreementsRouter.patch('/:id', authMiddleware, adminRolesMiddleware(), agreementsController.update)
agreementsRouter.delete('/:id', authMiddleware, adminRolesMiddleware(), agreementsController.remove)