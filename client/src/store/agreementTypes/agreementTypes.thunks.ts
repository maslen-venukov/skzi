import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from './agreementTypes.api'

export const getAgreementTypes = createAsyncThunk(
  'agreementTypes/getAgreementTypes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.getAgreementTypes()
      return res.data
    } catch(e) {
      return rejectWithValue(e)
    }
  }
)