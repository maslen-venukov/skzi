import api from '../../core/api'
import { GetAgreementsResponse, GetAgreementResponse } from './agreements.types'

export const getAgreements = async () => (
  await api.get<GetAgreementsResponse>('/api/agreements')
)

export const getAgreement = async (id: number) => (
  await api.get<GetAgreementResponse>(`/api/agreements/${id}`)
)