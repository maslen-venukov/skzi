import api from '../../core/api'
import { Act, CreateActData, UpdateActData } from './acts.types'
import { Pagination } from '../../interfaces/pagination.interface'

export const getActs = async (params: Pagination) => (
  await api.get<{
    acts: Act[]
    page: number
    count: number
    total: number
  }>('/api/acts', { params })
)

export const getAgreementActs = async (id: number) => (
  await api.get<{
    acts: Act[]
  }>(`/api/agreements/${id}/acts`)
)

export const getAct = async (id: number) => (
  await api.get<{
    act: Act
  }>(`/api/acts/${id}`)
)

export const createAct = async (data: CreateActData) => (
  await api.post<{
    message: string
    act: Act
  }>('/api/acts', data)
)

export const updateAct = async (id: number, data: UpdateActData) => (
  await api.patch<{
    message: string
    act: Act
  }>(`/api/acts/${id}`, data)
)

export const removeAct = async (id: number) => (
  await api.delete<{
    message: string
  }>(`/api/acts/${id}`)
)