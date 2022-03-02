import { Repository } from '../core/repository'
import { RawAgreementComment } from './agreement-comment.interface'

class AgreementCommentsRepository extends Repository<RawAgreementComment> {
  constructor() {
    super({
      table: 'comment_agreement',
      columns: [
        'id',
        'agreementId',
        'comment',
        'addDate',
        'addUserId'
      ]
    })
  }
}

export const agreementCommentsRepository = new AgreementCommentsRepository()