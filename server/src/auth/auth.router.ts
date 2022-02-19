import { Router } from 'express'
import { authController } from './auth.controller'

export const authRouter = Router()

authRouter.post('/registration', authController.registration)
authRouter.post('/login', authController.login)