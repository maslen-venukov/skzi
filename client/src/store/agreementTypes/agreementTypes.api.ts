import api from '../../core/api'
import { GetAgreementTypesResponse } from './agreementTypes.types'

export const getAgreementTypes = async () => (
  await api.get<GetAgreementTypesResponse>('/api/agreement-types')
)