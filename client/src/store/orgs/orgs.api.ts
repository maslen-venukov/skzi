import api from '../../core/api'
import { GetOrgsResponse } from './orgs.types'

export const getOrgs = async () => (
  await api.get<GetOrgsResponse>('/api/orgs')
)