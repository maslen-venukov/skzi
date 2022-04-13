import api from '../../core/api'
import { Org, CreateOrgData, UpdateOrgData } from './orgs.types'

export const getOrgs = async () => (
  await api.get<{
    orgs: Org[]
  }>('/api/orgs')
)

export const createOrg = async (data: CreateOrgData) => (
  await api.post<{
    message: string
    org: Org
  }>('/api/orgs', data)
)

export const updateOrg = async (id: number, data: UpdateOrgData) => (
  await api.patch<{
    message: string
    org: Org
  }>(`/api/orgs/${id}`, data)
)