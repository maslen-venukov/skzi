import api from '../../core/api'
import { Agreement } from './agreements.types'

export const getAgreements = async () => (
  await api.get<{
    agreements: Agreement[]
  }>('/api/agreements')
)

export const getAgreement = async (id: number) => (
  await api.get<{
    agreement: Agreement
  }>(`/api/agreements/${id}`)
)