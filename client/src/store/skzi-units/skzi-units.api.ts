import api from '../../core/api'
import { SkziUnit, CreateSkziUnitData, UpdateSkziUnitData } from './skzi-units.types'

export const getSkziUnits = async () => (
  await api.get<{
    skziUnits: SkziUnit[]
  }>('/api/skzi-units')
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