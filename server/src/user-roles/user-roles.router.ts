import { Router } from 'express'
import { userRolesController } from './user-users.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import { adminRolesMiddleware } from '../middleware/roles.middleware'

export const userRolesRouter = Router()

userRolesRouter.get('/', authMiddleware, adminRolesMiddleware(), userRolesController.getAll)