import { makeAutoObservable } from 'mobx'
import { getUsers, updateUser } from './users.api'
import catchApiError from '../../utils/catchApiError'
import { UpdateUserData, User } from './users.types'
import { message } from 'antd'

class UsersStore {
  isLoading = false
  users: User[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setUsers(value: User[]) {
    this.users = value
  }

  async getUsers() {
    this.setLoading(true)
    try {
      const res = await getUsers()
      this.setUsers(res.data.users)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async updateUser(id: number, data: UpdateUserData) {
    this.setLoading(true)
    try {
      const res = await updateUser(id, data)
      this.setUsers(this.users.map(user => (
        user.id === res.data.user.id ? res.data.user : user)
      ))
      message.success(res.data.message)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new UsersStore()