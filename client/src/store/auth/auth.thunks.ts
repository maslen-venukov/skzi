import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from './auth.api'
import { LoginPayload } from './auth.types'

export const auth = createAsyncThunk('auth/auth', async (_, { rejectWithValue }) => {
  try {
    const res = await api.auth()
    return res.data
  } catch(e) {
    return rejectWithValue(e)
  }
})

export const login = createAsyncThunk('auth/login', async (data: LoginPayload, { rejectWithValue }) => {
  try {
    const res = await api.login(data)
    return res.data
  } catch(e) {
    return rejectWithValue(e)
  }
})