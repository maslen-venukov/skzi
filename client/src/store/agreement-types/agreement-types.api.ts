import api from '../../core/api'
import { Type } from '../../interfaces/type.interface'

export const getAgreementTypes = async () => (
  await api.get<{
    types: Type[]
  }>('/api/agreement-types')
)