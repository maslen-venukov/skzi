import { Router } from 'express'
import { agreementsController } from './agreements.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import { adminRolesMiddleware, operatorRolesMiddleware } from '../middleware/roles.middleware'

export const agreementsRouter = Router()

agreementsRouter.get('/', authMiddleware, agreementsController.getAll)
agreementsRouter.get('/:id', authMiddleware, agreementsController.getById)
agreementsRouter.get('/:id/skzi-units', authMiddleware, agreementsController.getSkziUnits)
agreementsRouter.post('/', authMiddleware, operatorRolesMiddleware(), agreementsController.create)
agreementsRouter.patch('/:id', authMiddleware, adminRolesMiddleware(), agreementsController.update)
agreementsRouter.delete('/:id', authMiddleware, adminRolesMiddleware(), agreementsController.remove)