import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from './agreements.api'

export const getAgreements = createAsyncThunk(
  'agreements/getAgreements',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.getAgreements()
      return res.data
    } catch(e) {
      return rejectWithValue(e)
    }
  }
)

export const getAgreement = createAsyncThunk(
  'agreements/getAgreement',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.getAgreement(id)
      return res.data
    } catch(e) {
      return rejectWithValue(e)
    }
  }
)