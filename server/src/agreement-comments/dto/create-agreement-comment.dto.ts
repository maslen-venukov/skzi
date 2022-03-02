import { RawAgreementComment } from '../agreement-comment.interface'

type CreateAgreementCommentDtoParams = Omit<RawAgreementComment, 'id' | 'addDate'>

export class CreateAgreementCommentDto implements CreateAgreementCommentDtoParams {
  agreementId: number
  comment: string
  addUserId: number

  constructor({
    agreementId,
    comment,
    addUserId
  }: CreateAgreementCommentDtoParams) {
    this.agreementId = agreementId
    this.comment = comment
    this.addUserId = addUserId
  }
}