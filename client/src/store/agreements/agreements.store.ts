import { makeAutoObservable } from 'mobx'
import { getAgreements } from './agreements.api'
import catchApiError from '../../utils/catchApiError'
import { Agreement } from './agreements.types'

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
}

export default new AgreementsStore()