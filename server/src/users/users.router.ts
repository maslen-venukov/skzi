import { Router } from 'express'
import { UsersController } from './users.controller'
import { UserRoles } from '../enums/user-roles.enum'
import authMiddleware from '../middleware/auth.middleware'
import rolesMiddleware from '../middleware/roles.middleware'

export const usersRouter = Router()

usersRouter.get('/', authMiddleware, rolesMiddleware([UserRoles.Admin, UserRoles.Operator]), UsersController.getAll)
usersRouter.get('/:id', authMiddleware, rolesMiddleware([UserRoles.Admin, UserRoles.Operator]), UsersController.getById)

// TODO закрыть роуты для определенных ролей