import { agreementCommentsRepository } from './agreement-comments.repository'
import { CreateAgreementCommentDto } from './dto/create-agreement-comment.dto'
import { agreementCommentsTransform } from './agreement-comments.transform'
import { ApiError } from '../exceptions/api-error'

class AgreementCommentsService {
  async getByAgreementId(agreementId: number) {
    const agreementComments = await agreementCommentsRepository.getAll({
      filters: { agreementId },
      sort: { id: 'desc' }
    })
    return await Promise.all(agreementComments.map(agreementCommentsTransform.expand))
  }

  async create(dto: CreateAgreementCommentDto) {
    const agreementComment = await agreementCommentsRepository.create(dto)
    return await agreementCommentsTransform.expand(agreementComment)
  }

  async remove(id: number) {
    const isDeleted = await agreementCommentsRepository.remove(id)
    if(!isDeleted) {
      throw ApiError.NotFound('Комментарий не найден')
    }
    return isDeleted
  }
}

export const agreementCommentsService = new AgreementCommentsService()