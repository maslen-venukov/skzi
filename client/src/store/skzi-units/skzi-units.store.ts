import { makeAutoObservable } from 'mobx'
import { message } from 'antd'
import { NavigateFunction } from 'react-router-dom'
import {
  createSkziUnit,
  getSkziUnit,
  getSkziUnits,
  getAgreementSkziUnits,
  updateSkziUnit
} from './skzi-units.api'
import catchApiError from '../../utils/catchApiError'
import { SkziUnit, CreateSkziUnitData, UpdateSkziUnitData } from './skzi-units.types'
import { Pagination } from '../../interfaces/pagination.interface'

class SkziUnitsStore {
  isLoading = false
  isAgreementLoading = false
  total = 0
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

  setTotal(value: number) {
    this.total = value
  }

  setSkziUnits(value: SkziUnit[]) {
    this.skziUnits = value
  }

  setSkziUnit(value: SkziUnit | null) {
    this.skziUnit = value
  }

  async getSkziUnits(params: Pagination) {
    this.setLoading(true)
    try {
      const res = await getSkziUnits(params)
      this.setSkziUnits(res.data.skziUnits)
      this.setTotal(res.data.total)
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

  async getAgreementSkziUnits(id: number) {
    this.setLoading(true)
    try {
      const res = await getAgreementSkziUnits(id)
      this.setSkziUnits(res.data.skziUnits)
    } catch(e) {
      catchApiError(e)
    } finally {
      this.setLoading(false)
    }
  }

  async createSkziUnit(data: CreateSkziUnitData, navigate: NavigateFunction) {
    this.setLoading(true)
    try {
      const res = await createSkziUnit(data)
      message.success(res.data.message)
      navigate(`/skzi-units/${res.data.skziUnit.id}`)
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