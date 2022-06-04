import api from '../../core/api'
import {
  CreateUserData,
  UpdateUserData,
  ChangePasswordData,
  User
} from './users.types'

export const getUsers = async () => (
  await api.get<{
    users: User[]
  }>('/api/users')
)

export const createUser = async (data: CreateUserData) => (
  await api.post<{
    message: string
    user: User
  }>(`/api/users`, data)
)

export const updateUser = async (
  id: number,
  data: UpdateUserData
) => (
  await api.patch<{
    message: string
    user: User
  }>(`/api/users/${id}`, data)
)

export const changePassword = async (data: ChangePasswordData) => (
  await api.patch<{
    message: string
  }>('/api/users/password', data)
)