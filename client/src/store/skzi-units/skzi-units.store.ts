import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import { createSkziUnit, getSkziUnits, updateSkziUnit } from './skzi-units.api'
import catchApiError from '../../utils/catchApiError'
import { SkziUnit, CreateSkziUnitData, UpdateSkziUnitData } from './skzi-units.types'

class SkziUnitsStore {
  isLoading = false
  skziUnits: SkziUnit[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setSkziUnits(value: SkziUnit[]) {
    this.skziUnits = value
  }

  async getSkziUnits() {
    this.setLoading(true)
    try {
      const res = await getSkziUnits()
      this.setSkziUnits(res.data.skziUnits)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async createSkziUnit(data: CreateSkziUnitData) {
    this.setLoading(true)
    try {
      const res = await createSkziUnit(data)
      this.setSkziUnits([res.data.skziUnit, ...this.skziUnits])
      message.success(res.data.message)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async updateSkziUnit(id: number, data: UpdateSkziUnitData) {
    this.setLoading(true)
    try {
      const res = await updateSkziUnit(id, data)
      this.setSkziUnits(this.skziUnits.map(skziUnit => (
        skziUnit.id === res.data.skziUnit.id ? res.data.skziUnit : skziUnit
      )))
      message.success(res.data.message)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new SkziUnitsStore()