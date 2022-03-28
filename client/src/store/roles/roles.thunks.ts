import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from './roles.api'

export const getRoles = createAsyncThunk('roles/getRoles', async (_, { rejectWithValue }) => {
  try {
    const res = await api.getRoles()
    return res.data
  } catch(e) {
    return rejectWithValue(e)
  }
})