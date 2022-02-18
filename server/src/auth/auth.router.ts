import { Router } from 'express'
import { AuthController } from './auth.controller'

export const authRouter = Router()

authRouter.post('/registration', AuthController.registration)
authRouter.post('/login', AuthController.login)