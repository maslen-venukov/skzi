import { makeAutoObservable } from 'mobx'
import { getAgreementTypes } from './agreement-types.api'
import catchApiError from '../../utils/catchApiError'
import { Type } from '../../interfaces/type.interface'

class AgreementTypesStore {
  isLoading = false
  types: Type[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setAgreementTypes(value: Type[]) {
    this.types = value
  }

  async getAgreementTypes() {
    this.setLoading(true)
    try {
      const res = await getAgreementTypes()
      this.setAgreementTypes(res.data.types)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}


export default new AgreementTypesStore()