import { makeAutoObservable } from 'mobx'
import { getOrgs } from './orgs.api'
import catchApiError from '../../utils/catchApiError'
import { Org } from './orgs.types'

class OrgsStore {
  isLoading = false
  orgs: Org[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setOrgs(value: Org[]) {
    this.orgs = value
  }

  async getOrgs() {
    this.setLoading(true)
    try {
      const res = await getOrgs()
      this.setOrgs(res.data.orgs)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new OrgsStore()