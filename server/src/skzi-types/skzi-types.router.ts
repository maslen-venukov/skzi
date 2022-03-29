import { Router } from 'express'
import { skziTypesController } from './skzi-types.controller'
import { authMiddleware } from '../middleware/auth.middleware'

export const skziTypesRouter = Router()

skziTypesRouter.get('/', authMiddleware, skziTypesController.getAll)