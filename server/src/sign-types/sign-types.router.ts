import { Router } from 'express'
import { signTypesController } from './sign-types.controller'
import { authMiddleware } from '../middleware/auth.middleware'

export const signTypesRouter = Router()

signTypesRouter.get('/', authMiddleware, signTypesController.getAll)