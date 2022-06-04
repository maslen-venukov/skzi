import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import {
  getActs,
  getAct,
  createAct,
  updateAct,
  removeAct,
  getAgreementActs,
  getSkziUnitActs
} from './acts.api'
import catchApiError from '../../utils/catchApiError'
import { Act, CreateActData, UpdateActData } from './acts.types'
import { Pagination } from '../../interfaces/pagination.interface'

class ActsStore {
  isLoading = false
  total = 0
  acts: Act[] = []
  act: Act | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setActs(value: Act[]) {
    this.acts = value
  }

  setAct(value: Act | null) {
    this.act = value
  }

  setTotal(value: number) {
    this.total = value
  }

  async getActs(params: Pagination) {
    this.setLoading(true)
    try {
      const res = await getActs(params)
      this.setActs(res.data.acts)
      this.setTotal(res.data.total)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async getAct(id: number) {
    this.setLoading(true)
    try {
      const res = await getAct(id)
      this.setAct(res.data.act)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async getAgreementActs(id: number) {
    this.setLoading(true)
    try {
      const res = await getAgreementActs(id)
      this.setActs(res.data.acts)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async getSkziUnitActs(id: number) {
    this.setLoading(true)
    try {
      const res = await getSkziUnitActs(id)
      this.setActs(res.data.acts)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async createAct(data: CreateActData) {
    return new Promise<Act>(async (resolve, reject) => {
      this.setLoading(true)
      try {
        const res = await createAct(data)
        message.success(res.data.message)
        resolve(res.data.act)
      } catch(e) {
        catchApiError(e)
        reject(e)
      } finally {
        this.setLoading(false)
      }
    })
  }

  async updateAct(id: number, data: UpdateActData) {
    this.setLoading(true)
    try {
      const res = await updateAct(id, data)

      if(this.act?.id === id) {
        this.setAct(res.data.act)
      } else {
        this.setActs(this.acts.map(act => (
          act.id === res.data.act.id ? res.data.act : act
        )))
      }

      message.success(res.data.message)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async removeAct(id: number) {
    return new Promise<number>(async (resolve, reject) => {
      this.setLoading(true)
        try {
          const res = await removeAct(id)
          message.success(res.data.message)
          resolve(id)
        } catch(e) {
          catchApiError(e)
          reject(e)
        } finally {
          this.setLoading(false)
        }
    })
  }
}

export default new ActsStore()