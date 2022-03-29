import { Router } from 'express'
import { agreementTypesController } from './agreement-types.controller'
import { authMiddleware } from '../middleware/auth.middleware'

export const agreementTypesRouter = Router()

agreementTypesRouter.get('/', authMiddleware, agreementTypesController.getAll)