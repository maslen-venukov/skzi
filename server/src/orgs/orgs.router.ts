import { Router } from 'express'
import { orgsController } from './orgs.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import {
  adminRolesMiddleware,
  operatorRolesMiddleware,
  userRolesMiddleware
} from '../middleware/roles.middleware'

export const orgsRouter = Router()

orgsRouter.get('/', authMiddleware, userRolesMiddleware(), orgsController.getAll)
orgsRouter.get('/:id', authMiddleware, userRolesMiddleware(), orgsController.getById)
orgsRouter.post('/', authMiddleware, operatorRolesMiddleware(), orgsController.create)
orgsRouter.patch('/:id', authMiddleware, adminRolesMiddleware(), orgsController.update)
orgsRouter.delete('/:id', authMiddleware, adminRolesMiddleware(), orgsController.remove)