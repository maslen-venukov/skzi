import { makeAutoObservable } from 'mobx'
import { getRoles } from './roles.api'
import catchApiError from '../../utils/catchApiError'
import { Role } from './roles.types'

class RolesStore {
  isLoading = false
  roles: Role[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setRoles(value: Role[]) {
    this.roles = value
  }

  async getRoles() {
    this.setLoading(true)
    try {
      const res = await getRoles()
      this.setRoles(res.data.roles)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new RolesStore()