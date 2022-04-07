import { makeAutoObservable } from 'mobx'
import { getSignTypes } from './sign-types.api'
import catchApiError from '../../utils/catchApiError'
import { Type } from '../../interfaces/type.interface'

class SignTypesStore {
  isLoading = false
  types: Type[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setSignTypes(value: Type[]) {
    this.types = value
  }

  async getSignTypes() {
    this.setLoading(true)
    try {
      const res = await getSignTypes()
      this.setSignTypes(res.data.types)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new SignTypesStore()