import api from '../../core/api'
import { Role } from './roles.types'

export const getRoles = async () => (
  await api.get<{
    roles: Role[]
  }>('/api/roles')
)