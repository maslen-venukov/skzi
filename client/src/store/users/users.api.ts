import api from '../../core/api'
import {
  GetUsersResponse,
  UpdateUserResponse,
  UpdateUserData
} from './users.types'

export const getUsers = async () => (
  await api.get<GetUsersResponse>('/api/users')
)

export const updateUser = async (data: UpdateUserData) => {
  const { id, ...rest } = data
  return await api.patch<UpdateUserResponse>(`/api/users/${id}`, rest)
}