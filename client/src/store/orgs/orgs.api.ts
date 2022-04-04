import api from '../../core/api'
import { Org } from './orgs.types'

export const getOrgs = async () => (
  await api.get<{
    orgs: Org[]
  }>('/api/orgs')
)