import { Router } from 'express'
import { usersController } from './users.controller'
import { UserRoles } from '../enums/user-roles.enum'
import { authMiddleware } from '../middleware/auth.middleware'
import { rolesMiddleware } from '../middleware/roles.middleware'

export const usersRouter = Router()

usersRouter.get('/', authMiddleware, rolesMiddleware([UserRoles.Admin, UserRoles.Operator]), usersController.getAll)
usersRouter.get('/:id', authMiddleware, rolesMiddleware([UserRoles.Admin, UserRoles.Operator]), usersController.getById)
usersRouter.patch('/:id', authMiddleware, rolesMiddleware([UserRoles.Admin, UserRoles.Operator]), usersController.update)
usersRouter.delete('/:id', authMiddleware, rolesMiddleware([UserRoles.Admin, UserRoles.Operator]), usersController.remove)