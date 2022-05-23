import api from '../../core/api'
import {
  SkziUnit,
  GetSkziUnitsParams,
  CreateSkziUnitData,
  UpdateSkziUnitData
} from './skzi-units.types'

export const getSkziUnits = async (params: GetSkziUnitsParams = {}) => (
  await api.get<{
    skziUnits: SkziUnit[]
  }>('/api/skzi-units', { params })
)

export const getSkziUnit = async (id: number) => (
  await api.get<{
    skziUnit: SkziUnit
  }>(`/api/skzi-units/${id}`)
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