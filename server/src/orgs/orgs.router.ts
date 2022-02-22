import { Router } from 'express'
import { orgsController } from './orgs.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import { rolesMiddleware } from '../middleware/roles.middleware'
import { UserRoles } from '../enums/user-roles.enum'

export const orgsRouter = Router()

orgsRouter.get('/', authMiddleware, rolesMiddleware([UserRoles.Admin, UserRoles.Operator, UserRoles.User]), orgsController.getAll)
orgsRouter.get('/:id', authMiddleware, rolesMiddleware([UserRoles.Admin, UserRoles.Operator, UserRoles.User]), orgsController.getById)
orgsRouter.post('/', authMiddleware, rolesMiddleware([UserRoles.Admin, UserRoles.Operator]), orgsController.create)
orgsRouter.patch('/:id', authMiddleware, rolesMiddleware([UserRoles.Admin]), orgsController.update)
orgsRouter.delete('/:id', authMiddleware, rolesMiddleware([UserRoles.Admin]), orgsController.remove)