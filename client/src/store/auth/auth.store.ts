import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import { auth, login } from './auth.api'
import catchApiError from '../../utils/catchApiError'
import storage from '../../utils/storage'
import isRoleMatch from '../../utils/isRoleMatch'
import { LoginData } from './auth.types'
import { User } from '../users/users.types'
import { Roles } from '../roles/roles.types'

class AuthStore {
  isAuth = false
  isLoading = false
  isReady = false
  user: User | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  private isUserHasRole(role: Roles) {
    return this.user && isRoleMatch(this.user.role.role, role)
  }

  get isAdmin() {
    return this.isUserHasRole(Roles.Admin)
  }

  get isOperator() {
    return this.isUserHasRole(Roles.Operator)
  }

  setAuth(value: boolean) {
    this.isAuth = value
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setReady(value: boolean) {
    this.isReady = value
  }

  setUser(value: User | null) {
    this.user = value
  }

  logout() {
    this.setAuth(false)
    this.setUser(null)
    storage.remove('token')
    message.success('Вы успешно вышли')
  }

  async auth() {
    try {
      const res = await auth()
      this.setAuth(true)
      this.setUser(res.data.user)
    } catch(e) {
      catchApiError(e)
      storage.remove('token')
    } finally {
      this.setReady(true)
    }
  }

  async login(data: LoginData) {
    this.setLoading(true)
    try {
      const res = await login(data)
      this.setAuth(true)
      this.setUser(res.data.user)
      storage.set('token', res.data.token)
      message.success('Вы успешно авторизовались')
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new AuthStore()