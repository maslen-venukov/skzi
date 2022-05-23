import { RawAgreementComment } from '../agreement-comment.interface'

type CreateAgreementCommentDtoParams = Omit<RawAgreementComment, 'id' | 'addDate'>

export class CreateAgreementCommentDto implements CreateAgreementCommentDtoParams {
  agreementId: number
  comment: string
  addUserId: number

  constructor(params: CreateAgreementCommentDtoParams) {
    this.agreementId = params.agreementId
    this.comment = params.comment
    this.addUserId = params.addUserId
  }
}