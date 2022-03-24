import { Router } from 'express'
import { authController } from './auth.controller'
import { authMiddleware } from '../middleware/auth.middleware'

export const authRouter = Router()

authRouter.get('/', authMiddleware, authController.auth)
authRouter.post('/registration', authController.registration)
authRouter.post('/login', authController.login)