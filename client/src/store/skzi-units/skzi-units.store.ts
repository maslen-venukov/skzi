import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import {
  createSkziUnit,
  getSkziUnit,
  getSkziUnits,
  updateSkziUnit
} from './skzi-units.api'
import catchApiError from '../../utils/catchApiError'
import {
  SkziUnit,
  GetSkziUnitsParams,
  CreateSkziUnitData,
  UpdateSkziUnitData
} from './skzi-units.types'

class SkziUnitsStore {
  isLoading = false
  isAgreementLoading = false
  skziUnits: SkziUnit[] = []
  skziUnit: SkziUnit | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLoading(value: boolean) {
    this.isLoading = value
  }

  setAgreementLoading(value: boolean) {
    this.isAgreementLoading = value
  }

  setSkziUnits(value: SkziUnit[]) {
    this.skziUnits = value
  }

  setSkziUnit(value: SkziUnit | null) {
    this.skziUnit = value
  }

  async getSkziUnits(params: GetSkziUnitsParams = {}) {
    this.setLoading(true)
    try {
      const res = await getSkziUnits(params)
      this.setSkziUnits(res.data.skziUnits)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async getSkziUnit(id: number) {
    this.setLoading(true)
    try {
      const res = await getSkziUnit(id)
      this.setSkziUnit(res.data.skziUnit)
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

      if(this.skziUnit?.id === id) {
        this.setSkziUnit(res.data.skziUnit)
      } else {
        this.setSkziUnits(this.skziUnits.map(skziUnit => (
          skziUnit.id === res.data.skziUnit.id ? res.data.skziUnit : skziUnit
        )))
      }

      message.success(res.data.message)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }
}

export default new SkziUnitsStore()