import api from '../../core/api'
import { Type } from '../../interfaces/type.interface'

export const getSignTypes = async () => (
  await api.get<{
    types: Type[]
  }>('/api/sign-types')
)