import api from '../../core/api'
import { GetRolesResponse } from './roles.types'

export const getRoles = async () => (
  await api.get<GetRolesResponse>('/api/roles')
)