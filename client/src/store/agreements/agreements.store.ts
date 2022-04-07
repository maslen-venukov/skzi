import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import { getAgreements, createAgreement, updateAgreement } from './agreements.api'
import catchApiError from '../../utils/catchApiError'
import { Agreement, CreateAgreementData, UpdateAgreementData } from './agreements.types'

class AgreementsStore {
  isLoading = false
  agreements: Agreement[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setAgreements(value: Agreement[]) {
    this.agreements = value
  }

  async getAgreements() {
    this.setLoading(true)
    try {
      const res = await getAgreements()
      this.setAgreements(res.data.agreements)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async createAgreement(data: CreateAgreementData) {
    this.setLoading(true)
    try {
      const res = await createAgreement(data)
      this.setAgreements([res.data.agreement, ...this.agreements])
      message.success(res.data.message)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async updateAgreement(id: number, data: UpdateAgreementData) {
    this.setLoading(true)
    try {
      const res = await updateAgreement(id, data)
      this.setAgreements(this.agreements.map(agreement => (
        agreement.id === res.data.agreement.id ? res.data.agreement : agreement
      )))
      message.success(res.data.message)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new AgreementsStore()