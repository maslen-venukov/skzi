import api from '../../core/api'
import { VipnetLan } from './vipnet-lans.types'

export const getVipnetLans = async () => (
  await api.get<{
    vipnetLans: VipnetLan[]
  }>('/api/vipnet-lans')
)