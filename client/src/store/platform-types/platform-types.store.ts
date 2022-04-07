import { makeAutoObservable } from 'mobx'
import { getPlatformTypes } from './platform-types.api'
import catchApiError from '../../utils/catchApiError'
import { Type } from '../../interfaces/type.interface'

class PlatformTypesStore {
  isLoading = false
  types: Type[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setPlatformTypes(value: Type[]) {
    this.types = value
  }

  async getPlatformTypes() {
    this.setLoading(true)
    try {
      const res = await getPlatformTypes()
      this.setPlatformTypes(res.data.types)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new PlatformTypesStore()