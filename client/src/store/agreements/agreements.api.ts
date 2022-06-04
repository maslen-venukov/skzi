import api from '../../core/api'
import { Agreement, CreateAgreementData, UpdateAgreementData } from './agreements.types'
import { Pagination } from '../../interfaces/pagination.interface'

export const getAgreements = async (params: Pagination) => (
  await api.get<{
    agreements: Agreement[]
    page: number
    count: number
    total: number
  }>('/api/agreements', { params })
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

export const removeAgreement = async (id: number) => (
  await api.delete<{
    message: string
  }>(`/api/agreements/${id}`)
)