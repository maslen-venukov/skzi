import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import { getAgreements, getAgreement, createAgreement, updateAgreement } from './agreements.api'
import catchApiError from '../../utils/catchApiError'
import { Agreement, CreateAgreementData, UpdateAgreementData } from './agreements.types'

class AgreementsStore {
  isLoading = false
  agreements: Agreement[] = []
  agreement: Agreement | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setAgreements(value: Agreement[]) {
    this.agreements = value
  }

  setAgreement(value: Agreement | null) {
    this.agreement = value
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

  async getAgreement(id: number) {
    this.setLoading(true)
    try {
      const res = await getAgreement(id)
      this.setAgreement(res.data.agreement)
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

      if(this.agreement?.id === id) {
        this.setAgreement(res.data.agreement)
      } else {
        this.setAgreements(this.agreements.map(agreement => (
          agreement.id === res.data.agreement.id ? res.data.agreement : agreement
        )))
      }

      message.success(res.data.message)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new AgreementsStore()