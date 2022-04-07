import api from '../../core/api'
import { Agreement, CreateAgreementData, UpdateAgreementData } from './agreements.types'

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

export const createAgreement = async (data: CreateAgreementData) => (
  await api.post<{
    message: string
    agreement: Agreement
  }>('/api/agreements', data)
)

export const updateAgreement = async (id: number, data: UpdateAgreementData) => (
  await api.patch<{
    message: string
    agreement: Agreement
  }>(`/api/agreements/${id}`, data)
)