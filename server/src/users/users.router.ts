import { Router } from 'express'
import { usersController } from './users.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import { adminRolesMiddleware } from '../middleware/roles.middleware'

export const usersRouter = Router()

usersRouter.get('/', authMiddleware, adminRolesMiddleware(), usersController.getAll)
usersRouter.get('/:id', authMiddleware, adminRolesMiddleware(), usersController.getById)
usersRouter.post('/', authMiddleware, adminRolesMiddleware(), usersController.create)
usersRouter.patch('/:id', authMiddleware, adminRolesMiddleware(), usersController.update)
usersRouter.delete('/:id', authMiddleware, adminRolesMiddleware(), usersController.remove)