import { makeAutoObservable } from 'mobx'
import { getVipnetLans } from './vipnet-lans.api'
import catchApiError from '../../utils/catchApiError'
import { VipnetLan } from './vipnet-lans.types'

class VipnetLansStore {
  isLoading = false
  vipnetLans: VipnetLan[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setVipnetLans(value: VipnetLan[]) {
    this.vipnetLans = value
  }

  async getVipnetLans() {
    this.setLoading(true)
    try {
      const res = await getVipnetLans()
      this.setVipnetLans(res.data.vipnetLans)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new VipnetLansStore()