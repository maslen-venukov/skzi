import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import { getOrgs, createOrg, updateOrg } from './orgs.api'
import catchApiError from '../../utils/catchApiError'
import { Org, CreateOrgData, UpdateOrgData } from './orgs.types'

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

  async createOrg(data: CreateOrgData) {
    this.setLoading(true)
    try {
      const res = await createOrg(data)
      this.setOrgs([res.data.org, ...this.orgs])
      message.success(res.data.message)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async updateOrg(id: number, data: UpdateOrgData) {
    this.setLoading(true)
    try {
      const res = await updateOrg(id, data)
      this.setOrgs(this.orgs.map(org => (
        org.id === res.data.org.id ? res.data.org : org
      )))
      message.success(res.data.message)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new OrgsStore()