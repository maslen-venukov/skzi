import api from '../../core/api'
import { SkziUnit, CreateSkziUnitData, UpdateSkziUnitData } from './skzi-units.types'
import { Pagination } from '../../interfaces/pagination.interface'

export const getSkziUnits = async (params: Pagination) => (
  await api.get<{
    skziUnits: SkziUnit[]
    page: number
    count: number
    total: number
  }>('/api/skzi-units', { params })
)

export const getSkziUnit = async (id: number) => (
  await api.get<{
    skziUnit: SkziUnit
  }>(`/api/skzi-units/${id}`)
)

export const getAgreementSkziUnits = async (id: number) => (
  await api.get<{
    skziUnits: SkziUnit[]
  }>(`/api/agreements/${id}/skzi-units`)
)

export const createSkziUnit = async (data: CreateSkziUnitData) => (
  await api.post<{
    message: string
    skziUnit: SkziUnit
  }>('/api/skzi-units', data)
)

export const updateSkziUnit = async (id: number, data: UpdateSkziUnitData) => (
  await api.patch<{
    message: string
    skziUnit: SkziUnit
  }>(`/api/skzi-units/${id}`, data)
)

export const removeSkziUnit = async (id: number) => (
  await api.delete<{
    message: string
  }>(`/api/skzi-units/${id}`)
)