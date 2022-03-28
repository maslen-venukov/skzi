import api from '../../core/api'
import { GetUsersResponse } from './users.types'

export const getUsers = async () => (
  await api.get<GetUsersResponse>('/api/users')
)