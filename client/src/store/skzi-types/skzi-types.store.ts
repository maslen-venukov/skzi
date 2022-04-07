import { makeAutoObservable } from 'mobx'
import { getSkziTypes } from './skzi-types.api'
import catchApiError from '../../utils/catchApiError'
import { Type } from '../../interfaces/type.interface'

class SkziTypesStore {
  isLoading = false
  types: Type[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setSkziTypes(value: Type[]) {
    this.types = value
  }

  async getSkziTypes() {
    this.setLoading(true)
    try {
      const res = await getSkziTypes()
      this.setSkziTypes(res.data.types)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new SkziTypesStore()