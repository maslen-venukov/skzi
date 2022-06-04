import { makeAutoObservable } from 'mobx'
import { getUsers, createUser, updateUser, changePassword } from './users.api'
import catchApiError from '../../utils/catchApiError'
import { CreateUserData, UpdateUserData, ChangePasswordData, User } from './users.types'
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

  async createUser(data: CreateUserData) {
    return new Promise<User>(async (resolve, reject) => {
      this.setLoading(true)
      try {
        const res = await createUser(data)
        this.setUsers([res.data.user, ...this.users])
        message.success(res.data.message)
        resolve(res.data.user)
      } catch(e) {
        catchApiError(e)
        reject(e)
      } finally {
        this.setLoading(false)
      }
    })
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

  async changePassword(data: ChangePasswordData) {
    return new Promise<boolean>(async (resolve, reject) => {
      this.setLoading(true)
      try {
        const res = await changePassword(data)
        message.success(res.data.message)
        resolve(true)
      } catch(e) {
        catchApiError(e)
        reject(e)
      } finally {
        this.setLoading(false)
      }
    })
  }
}

export default new UsersStore()