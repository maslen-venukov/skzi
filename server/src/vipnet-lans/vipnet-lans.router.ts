import { Router } from 'express'
import { vipnetLansController } from './vipnet-lans.controller'
import { authMiddleware } from '../middleware/auth.middleware'

export const vipnetLansRouter = Router()

vipnetLansRouter.get('/', authMiddleware, vipnetLansController.getAll)