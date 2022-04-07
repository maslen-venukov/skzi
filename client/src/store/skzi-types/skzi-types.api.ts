import api from '../../core/api'
import { Type } from '../../interfaces/type.interface'

export const getSkziTypes = async () => (
  await api.get<{
    types: Type[]
  }>('/api/skzi-types')
)