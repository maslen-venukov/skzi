import { Router } from 'express'
import { agreementCommentsController } from './agreement-comments.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import {
  adminRolesMiddleware,
  operatorRolesMiddleware,
  userRolesMiddleware
} from '../middleware/roles.middleware'

export const agreementCommentsRouter = Router()

agreementCommentsRouter.get('/:agreementId', authMiddleware, userRolesMiddleware(), agreementCommentsController.getByAgreementId)
agreementCommentsRouter.post('/', authMiddleware, operatorRolesMiddleware(), agreementCommentsController.create)
agreementCommentsRouter.delete('/:id', authMiddleware, adminRolesMiddleware(), agreementCommentsController.remove)