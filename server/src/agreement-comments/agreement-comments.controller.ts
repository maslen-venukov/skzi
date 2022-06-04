import { Request, Response, NextFunction } from 'express'
import { agreementCommentsService } from './agreement-comments.service'
import { CreateAgreementCommentDto } from './dto/create-agreement-comment.dto'
import { ApiError } from '../exceptions/api-error'
import { AuthRequest } from '../interfaces/auth-request.interface'
import { User } from '../users/user.interface'

class AgreementCommentsController {
  async getByAgreementId(req: Request<{ agreementId: string }>, res: Response, next: NextFunction) {
    try {
      const agreementId = Number(req.params.agreementId)
      const agreementComments = await agreementCommentsService.getByAgreementId(agreementId)
      return res.json({ agreementComments })
    } catch(e) {
      next(e)
    }
  }

  async create(req: AuthRequest<{}, {}, Omit<CreateAgreementCommentDto, 'addUserId'>>, res: Response, next: NextFunction) {
    try {
      const { agreementId, comment } = req.body
      if (!agreementId || !comment) {
        throw ApiError.BadRequest('Заполните все поля')
      }

      const addUserId = (req.user as User).id

      const dto = new CreateAgreementCommentDto({ ...req.body, addUserId })
      const agreementComment = await agreementCommentsService.create(dto)
      return res.json({ message: 'Комментарий успешно добавлен', agreementComment })
    } catch(e) {
      next(e)
    }
  }

  async remove(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id)
      await agreementCommentsService.remove(id)
      return res.json({ message: 'Комментарий успешно удален' })
    } catch(e) {
      next(e)
    }
  }
}

export const agreementCommentsController = new AgreementCommentsController()