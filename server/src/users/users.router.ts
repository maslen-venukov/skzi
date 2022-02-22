import { Router } from 'express'
import { usersController } from './users.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import { rolesMiddleware } from '../middleware/roles.middleware'
import { UserRoles } from '../enums/user-roles.enum'

export const usersRouter = Router()

usersRouter.get('/', authMiddleware, rolesMiddleware([UserRoles.Admin]), usersController.getAll)
usersRouter.get('/:id', authMiddleware, rolesMiddleware([UserRoles.Admin]), usersController.getById)
usersRouter.patch('/:id', authMiddleware, rolesMiddleware([UserRoles.Admin]), usersController.update)
usersRouter.delete('/:id', authMiddleware, rolesMiddleware([UserRoles.Admin]), usersController.remove)