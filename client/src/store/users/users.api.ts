import api from '../../core/api'
import { UpdateUserData, User } from './users.types'

export const getUsers = async () => (
  await api.get<{
    users: User[]
  }>('/api/users')
)

export const updateUser = async (
  id: number,
  data: UpdateUserData
) => {
  return await api.patch<{
    message: string
    user: User
  }>(`/api/users/${id}`, data)
}