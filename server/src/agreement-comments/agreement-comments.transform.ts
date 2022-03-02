import { RawAgreementComment } from './agreement-comment.interface'
import { Comment } from '../interfaces/comment.interface'
import { usersService } from '../users/users.service'

class AgreementCommentsTransform {
  async expand(agreementComment: RawAgreementComment) {
    const { agreementId, addUserId, ...rest } = agreementComment

    const addUser = await usersService.getById(addUserId)

    return { ...rest, addUser } as Comment
  }
}

export const agreementCommentsTransform = new AgreementCommentsTransform()