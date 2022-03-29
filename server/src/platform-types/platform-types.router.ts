import { Router } from 'express'
import { platformTypesController } from './platform-types.controller'
import { authMiddleware } from '../middleware/auth.middleware'

export const platformTypesRouter = Router()

platformTypesRouter.get('/', authMiddleware, platformTypesController.getAll)